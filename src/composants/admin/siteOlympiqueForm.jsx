import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Plus, Check, Loader2, Image as ImageIcon, Upload, X, Trash2, Camera } from "lucide-react";
import { instanceApi } from "../../services/api";
import { toast } from "react-toastify";

const getFullImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:")) {
    return url;
  }
  return `http://127.0.0.1:8000${url.startsWith("/") ? "" : "/"}${url}`;
};

export default function SiteOlympiqueForm({ initialData = null, onCancel, onSuccess }) {
  const isEditing = Boolean(initialData?.id);
  const fileInputRef = useRef(null);

  const [sites, setSites] = useState([]);
  const [disciplinesList, setDisciplinesList] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [siteMode, setSiteMode] = useState("existing");
  const [newSiteData, setNewSiteData] = useState({
    nom: "",
    description: "",
    adresse: "",
  });

  const [newDisciplineName, setNewDisciplineName] = useState("");
  const [addingDiscipline, setAddingDiscipline] = useState(false);
  const [showNewDisciplineInput, setShowNewDisciplineInput] = useState(false);

  const [formData, setFormData] = useState({
    siteId: initialData?.site?.id || initialData?.site || "",
    nom: initialData?.nom || "",
    description: initialData?.description || "",
    capacite: initialData?.capacite || "",
    actif: initialData?.actif ?? true,
    selectedDisciplines: Array.isArray(initialData?.disciplines)
      ? initialData.disciplines.map((d) => d.id || d)
      : [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    initialData?.image_infrastructure
      ? getFullImageUrl(initialData.image_infrastructure)
      : null
  );

  useEffect(() => {
    const fetchOptions = async () => {
      setLoadingOptions(true);
      try {
        const [sitesRes, discRes] = await Promise.allSettled([
          instanceApi.get("/sites/"),
          instanceApi.get("/disciplines/"),
        ]);

        if (sitesRes.status === "fulfilled" && Array.isArray(sitesRes.value?.data)) {
          setSites(sitesRes.value.data);
          if (!formData.siteId && sitesRes.value.data.length > 0) {
            setFormData((prev) => ({ ...prev, siteId: sitesRes.value.data[0].id }));
          }
        }

        if (discRes.status === "fulfilled" && Array.isArray(discRes.value?.data)) {
          setDisciplinesList(discRes.value.data);
        }
      } catch (error) {
        console.error("Erreur chargement options site:", error);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner un fichier image valide (JPG, PNG, WEBP...)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 10 Mo");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDisciplineToggle = (id) => {
    setFormData((prev) => {
      const exists = prev.selectedDisciplines.includes(id);
      return {
        ...prev,
        selectedDisciplines: exists
          ? prev.selectedDisciplines.filter((item) => item !== id)
          : [...prev.selectedDisciplines, id],
      };
    });
  };

  const handleCreateNewDiscipline = async (e) => {
    e.preventDefault();
    if (!newDisciplineName.trim()) return;

    setAddingDiscipline(true);
    try {
      const response = await instanceApi.post("/disciplines/", {
        nom: newDisciplineName.trim(),
        description: "",
        actif: true,
      });

      const created = response.data;
      setDisciplinesList((prev) => [...prev, created]);
      setFormData((prev) => ({
        ...prev,
        selectedDisciplines: [...prev.selectedDisciplines, created.id],
      }));
      setNewDisciplineName("");
      setShowNewDisciplineInput(false);
      toast.success(`Discipline "${created.nom}" ajoutée avec succès`);
    } catch (error) {
      const errData = error.response?.data;
      const message =
        errData?.nom?.[0] ||
        errData?.detail ||
        error.message ||
        "Erreur lors de l'ajout de la discipline";
      toast.error(message);
    } finally {
      setAddingDiscipline(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nom.trim()) {
      toast.error("Le nom de l'infrastructure est obligatoire");
      return;
    }

    setSubmitting(true);
    try {
      let finalSiteId = formData.siteId;

      if (siteMode === "new") {
        if (!newSiteData.nom.trim()) {
          toast.error("Veuillez renseigner le nom du nouveau site olympique");
          setSubmitting(false);
          return;
        }

        const createSiteRes = await instanceApi.post("/sites/", {
          nom: newSiteData.nom.trim(),
          description: newSiteData.description.trim(),
          adresse: newSiteData.adresse.trim(),
          actif: true,
        });

        finalSiteId = createSiteRes.data.id;
      }

      if (!finalSiteId) {
        toast.error("Veuillez sélectionner ou créer un site olympique");
        setSubmitting(false);
        return;
      }

      // Payload JSON classique — discipline_ids pour le champ writable du serializer
      const disciplineIds = formData.selectedDisciplines.map((id) => Number(id));

      const jsonPayload = {
        site: Number(finalSiteId),
        nom: formData.nom.trim(),
        description: formData.description.trim(),
        capacite: formData.capacite ? Number(formData.capacite) : null,
        actif: formData.actif,
        discipline_ids: disciplineIds,
      };

      console.log("=== PAYLOAD INFRASTRUCTURE ===");
      console.log("isEditing:", isEditing);
      console.log("disciplines sélectionnées:", formData.selectedDisciplines);
      console.log("disciplines envoyées (IDs):", disciplineIds);
      console.log("payload complet:", JSON.stringify(jsonPayload, null, 2));

      let savedInfra;

      if (isEditing) {
        const res = await instanceApi.patch(`/infrastructures/${initialData.id}/`, jsonPayload);
        savedInfra = res.data;
        console.log("=== RÉPONSE PATCH ===", JSON.stringify(res.data, null, 2));
        toast.success("Infrastructure / Site mis à jour avec succès");
      } else {
        const res = await instanceApi.post("/infrastructures/", jsonPayload);
        savedInfra = res.data;
        console.log("=== RÉPONSE POST ===", JSON.stringify(res.data, null, 2));
        toast.success("Infrastructure / Site créé avec succès");
      }

      // Upload de l'image séparément si un fichier a été sélectionné
      if (imageFile && savedInfra?.id) {
        try {
          const imagePayload = new FormData();
          imagePayload.append("image_infrastructure", imageFile);

          const imgRes = await instanceApi.patch(`/infrastructures/${savedInfra.id}/`, imagePayload, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          console.log("=== RÉPONSE IMAGE PATCH ===", JSON.stringify(imgRes.data, null, 2));
        } catch (imgError) {
          console.warn("Image non uploadée:", imgError);
          console.warn("Réponse erreur image:", imgError.response?.data);
          toast.error("Infrastructure sauvegardée, mais l'image n'a pas pu être uploadée.");
        }
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erreur enregistrement infrastructure:", error);
      const errData = error.response?.data;
      let message = "Erreur lors de l'enregistrement";

      if (errData) {
        if (typeof errData === "string") {
          message = errData;
        } else if (Array.isArray(errData)) {
          message = errData[0];
        } else if (errData.image_infrastructure) {
          const imgMsg = Array.isArray(errData.image_infrastructure)
            ? errData.image_infrastructure[0]
            : errData.image_infrastructure;
          message = `Image : ${imgMsg}`;
        } else if (errData.detail) {
          message = errData.detail;
        } else if (Array.isArray(errData.non_field_errors)) {
          message = errData.non_field_errors[0];
        } else {
          const firstKey = Object.keys(errData)[0];
          if (firstKey) {
            const val = errData[firstKey];
            const fieldMsg = Array.isArray(val) ? val[0] : val;
            message = `${firstKey}: ${fieldMsg}`;
          }
        }
      } else if (error.message) {
        message = error.message;
      }
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-[0px_1px_3px_rgba(0,0,0,0.04)] border border-gray-100/80">
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-gray-100 transition text-gray-600 cursor-pointer"
          title="Retour"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {isEditing ? "Modifier le site / infrastructure" : "Ajouter un site & infrastructure"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Renseignez les informations du site olympique, de son infrastructure, son image et ses disciplines.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1 : Site Olympique */}
        <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200/70 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              1. Site Olympique (Zone / Ville)
            </span>
            {!isEditing && (
              <div className="inline-flex rounded-lg p-0.5 bg-gray-200/70 text-xs">
                <button
                  type="button"
                  onClick={() => setSiteMode("existing")}
                  className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                    siteMode === "existing"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Site existant
                </button>
                <button
                  type="button"
                  onClick={() => setSiteMode("new")}
                  className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                    siteMode === "new"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  + Nouveau site
                </button>
              </div>
            )}
          </div>

          {siteMode === "existing" ? (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Sélectionner le site olympique <span className="text-rose-500">*</span>
              </label>
              <select
                name="siteId"
                value={formData.siteId}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                required
              >
                <option value="">Sélectionner un site (ex: Dakar, Diamniadio...)</option>
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nom} {s.adresse ? `- ${s.adresse}` : ""}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Nom du nouveau site <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSiteData.nom}
                  onChange={(e) =>
                    setNewSiteData((prev) => ({ ...prev, nom: e.target.value }))
                  }
                  placeholder="Ex: Diamniadio, Dakar, Saly..."
                  className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Adresse / Ville
                </label>
                <input
                  type="text"
                  value={newSiteData.adresse}
                  onChange={(e) =>
                    setNewSiteData((prev) => ({ ...prev, adresse: e.target.value }))
                  }
                  placeholder="Ex: Pôle urbain de Diamniadio"
                  className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2 : Informations de l'infrastructure */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
            2. Informations de l'infrastructure
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Nom de l'infrastructure <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Ex: Stade Abdoulaye Wade, Dakar Arena..."
                className="w-full px-3.5 py-2.5 bg-gray-50/50 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Capacité (Nombre de places)
              </label>
              <input
                type="number"
                name="capacite"
                value={formData.capacite}
                onChange={handleChange}
                placeholder="Ex: 50000"
                className="w-full px-3.5 py-2.5 bg-gray-50/50 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Description de l'infrastructure
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Ex: Stade multifonctionnel de 50 000 places, inauguré en 2022..."
                className="w-full px-3.5 py-2.5 bg-gray-50/50 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3 : Image de l'infrastructure */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <div>
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
              3. Image de l'infrastructure
            </label>
            <span className="text-[11px] text-gray-500">
              Téléchargez une photo représentative de l'infrastructure (format JPG, PNG ou WebP).
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="infrastructure-image-input"
          />

          {imagePreview ? (
            <div className="relative rounded-2xl border border-gray-200 overflow-hidden bg-gray-50 max-w-lg group">
              <img
                src={imagePreview}
                alt="Aperçu infrastructure"
                className="w-full h-48 sm:h-56 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "";
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-lg bg-white/90 hover:bg-white text-gray-800 text-xs font-semibold flex items-center gap-1.5 shadow transition cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Changer l'image</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="px-3.5 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Supprimer</span>
                </button>
              </div>
              {imageFile && (
                <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 rounded-md text-[11px] text-white backdrop-blur-xs">
                  {imageFile.name} ({(imageFile.size / (1024 * 1024)).toFixed(2)} Mo)
                </div>
              )}
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:border-emerald-500 bg-gray-50/60 hover:bg-emerald-50/20 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition max-w-lg text-center"
            >
              <div className="p-3.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Cliquez pour importer une image
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, WEBP jusqu'à 10 Mo
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 4 : Disciplines associées */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                4. Disciplines associées
              </label>
              <span className="text-[11px] text-gray-500">
                Sélectionnez les disciplines qui se déroulent dans cette infrastructure.
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowNewDisciplineInput(!showNewDisciplineInput)}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Créer une nouvelle discipline</span>
            </button>
          </div>

          {showNewDisciplineInput && (
            <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center gap-2 max-w-md">
              <input
                type="text"
                value={newDisciplineName}
                onChange={(e) => setNewDisciplineName(e.target.value)}
                placeholder="Nom de la discipline (ex: Escrime, Surf...)"
                className="flex-1 px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                disabled={addingDiscipline || !newDisciplineName.trim()}
                onClick={handleCreateNewDiscipline}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
              >
                {addingDiscipline ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Ajouter"}
              </button>
              <button
                type="button"
                onClick={() => setShowNewDisciplineInput(false)}
                className="px-2 py-1.5 text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                Annuler
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {disciplinesList.length === 0 ? (
              <span className="text-xs text-gray-400">Aucune discipline disponible.</span>
            ) : (
              disciplinesList.map((d) => {
                const isSelected = formData.selectedDisciplines.includes(d.id);
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => handleDisciplineToggle(d.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "bg-emerald-500 text-white border-emerald-500 font-semibold shadow-xs"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{d.nom}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* SECTION 5 : Statut Actif */}
        <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
          <input
            type="checkbox"
            id="infra-actif"
            name="actif"
            checked={formData.actif}
            onChange={handleChange}
            className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
          />
          <label htmlFor="infra-actif" className="text-xs font-semibold text-gray-800 cursor-pointer select-none">
            Infrastructure active et visible au public
          </label>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={submitting || loadingOptions}
            className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-sm font-semibold text-white transition shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Enregistrement...</span>
              </>
            ) : isEditing ? (
              "Enregistrer les modifications"
            ) : (
              "+ Ajouter le site / infrastructure"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

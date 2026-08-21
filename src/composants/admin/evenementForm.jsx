import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Camera,
  Heart,
  CheckCircle2,
  Loader2,
  Zap,
} from "lucide-react";
import { instanceApi } from "../../services/api";
import { toast } from "react-toastify";

const STATUS_OPTIONS = [
  {
    id: "BROUILLON",
    label: "À venir",
    subtitle: "Ouvert aux réservations",
  },
  {
    id: "EN_COURS",
    label: "En cours",
    subtitle: "Événement actif",
  },
  {
    id: "TERMINE",
    label: "Terminé",
    subtitle: "Archives & résultats",
  },
];

export default function EvenementForm({
  initialData = null,
  onCancel,
  onSuccess,
  onDelete,
}) {
  const isEditing = Boolean(initialData?.id);

  const [disciplines, setDisciplines] = useState([]);
  const [infrastructures, setInfrastructures] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [formData, setFormData] = useState({
    titre: initialData?.titre || "",
    discipline: initialData?.discipline?.id || initialData?.discipline || "",
    date_debut: initialData?.date_debut
      ? initialData.date_debut.split("T")[0]
      : "",
    heure_debut:
      initialData?.date_debut && initialData.date_debut.includes("T")
        ? initialData.date_debut.split("T")[1].substring(0, 5)
        : "10:00",
    infrastructure:
      initialData?.infrastructure?.id || initialData?.infrastructure || "",
    jauge_totale:
      initialData?.jauge_totale ||
      initialData?.capacite ||
      initialData?.infrastructure?.capacite ||
      "",
    prix: initialData?.prix ?? "",
    prix_vip: initialData?.prix_vip ?? "",
    statut:
      initialData?.statut === "PUBLIE"
        ? "BROUILLON"
        : initialData?.statut || "BROUILLON",
    description: initialData?.description || "",
    categorie: initialData?.categorie || "MIXTE",
    type_evenement: initialData?.type_evenement || "TOURNOI",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    initialData?.image_principale ||
      initialData?.medias?.[0]?.image ||
      initialData?.image ||
      null,
  );

  useEffect(() => {
    const fetchOptions = async () => {
      setLoadingOptions(true);
      try {
        const [discRes, infraRes] = await Promise.allSettled([
          instanceApi.get("/disciplines/"),
          instanceApi.get("/infrastructures/"),
        ]);

        if (discRes.status === "fulfilled") {
          const discData = discRes.value?.data;
          const discList = Array.isArray(discData)
            ? discData
            : discData?.results || [];
          setDisciplines(discList);
        }
        if (infraRes.status === "fulfilled") {
          const infraData = infraRes.value?.data;
          const infraList = Array.isArray(infraData)
            ? infraData
            : infraData?.results || [];
          setInfrastructures(infraList);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des options:", error);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  const selectedInfraObj = useMemo(() => {
    if (!formData.infrastructure) return null;
    return infrastructures.find(
      (inf) => String(inf.id) === String(formData.infrastructure),
    );
  }, [infrastructures, formData.infrastructure]);

  const selectedDisciplineObj = useMemo(() => {
    if (!formData.discipline) return null;
    return disciplines.find(
      (d) => String(d.id) === String(formData.discipline),
    );
  }, [disciplines, formData.discipline]);

  const allowedDisciplineIds = useMemo(() => {
    if (!selectedInfraObj || !Array.isArray(selectedInfraObj.disciplines))
      return [];
    return selectedInfraObj.disciplines.map((d) =>
      typeof d === "object" ? d.id : d,
    );
  }, [selectedInfraObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "infrastructure") {
      const selectedInfra = infrastructures.find(
        (inf) => String(inf.id) === String(value),
      );
      const infraDiscIds = Array.isArray(selectedInfra?.disciplines)
        ? selectedInfra.disciplines.map((d) =>
            typeof d === "object" ? d.id : d,
          )
        : [];

      setFormData((prev) => {
        const updates = { ...prev, infrastructure: value };
        if (selectedInfra?.capacite) {
          updates.jauge_totale = selectedInfra.capacite;
        }
        if (
          infraDiscIds.length > 0 &&
          !infraDiscIds.includes(Number(prev.discipline))
        ) {
          updates.discipline = infraDiscIds[0];
        }
        return updates;
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("L'image ne doit pas dépasser 5 Mo");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteSelf = async () => {
    if (!initialData?.id) return;
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      return;
    }

    setDeleting(true);
    try {
      if (onDelete) {
        await onDelete(initialData.id);
      } else {
        await instanceApi.delete(`/evenements/${initialData.id}/`);
        toast.success("Événement supprimé avec succès");
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'événement");
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.titre.trim()) {
      toast.error("Le nom de l'événement est obligatoire");
      return;
    }
    if (!formData.infrastructure) {
      toast.error("Veuillez sélectionner un site / lieu");
      return;
    }
    if (!formData.discipline) {
      toast.error("Veuillez sélectionner une discipline");
      return;
    }
    if (
      allowedDisciplineIds.length > 0 &&
      !allowedDisciplineIds.includes(Number(formData.discipline))
    ) {
      toast.error(
        `La discipline sélectionnée n'est pas autorisée dans "${selectedInfraObj?.nom}".`,
      );
      return;
    }
    if (!formData.date_debut) {
      toast.error("La date de l'événement est obligatoire");
      return;
    }

    setSubmitting(true);

    try {
      const fullDateDebut = `${formData.date_debut}T${
        formData.heure_debut || "10:00"
      }:00Z`;
      const fullDateFin = `${formData.date_debut}T23:59:00Z`;

      const payload = {
        titre: formData.titre.trim(),
        discipline: Number(formData.discipline),
        infrastructure: Number(formData.infrastructure),
        date_debut: fullDateDebut,
        date_fin: fullDateFin,
        statut: formData.statut,
        categorie: formData.categorie,
        type_evenement: formData.type_evenement,
        prix: formData.prix !== "" ? Number(formData.prix) : 0,
        prix_vip: formData.prix_vip !== "" ? Number(formData.prix_vip) : 0,
        jauge_totale:
          formData.jauge_totale !== "" ? Number(formData.jauge_totale) : 0,
        description:
          formData.description || `Événement ${formData.titre.trim()}`,
        actif: true,
      };

      let response;
      if (isEditing) {
        response = await instanceApi.patch(
          `/evenements/${initialData.id}/`,
          payload,
        );
        toast.success("Événement mis à jour avec succès");
      } else {
        response = await instanceApi.post("/evenements/", payload);
        toast.success("Événement créé avec succès");
      }

      if (imageFile && response?.data?.id) {
        try {
          const mediaData = new FormData();
          mediaData.append("evenement", response.data.id);
          mediaData.append("image", imageFile);
          mediaData.append("type_media", "COUVERTURE");
          mediaData.append("est_principal", "true");
          mediaData.append("titre", `Couverture ${formData.titre}`);

          await instanceApi.post("/evenements-medias/", mediaData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } catch (mediaError) {
          console.warn("Image non uploadée:", mediaError);
        }
      }

      if (onSuccess) {
        onSuccess(response?.data);
      }
    } catch (error) {
      const errData = error.response?.data;
      console.error("Réponse backend brute:", JSON.stringify(errData, null, 2));

      let message = "Erreur lors de l'enregistrement de l'événement";

      if (errData) {
        if (typeof errData === "string") {
          message = errData;
        } else if (Array.isArray(errData)) {
          message = errData[0];
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
      }

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const disciplineDisplayName = selectedDisciplineObj?.nom || "Discipline";

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="p-2.5 rounded-full bg-white border border-gray-200/80 shadow-xs hover:bg-gray-50 text-gray-700 transition"
          title="Retour"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1528] tracking-tight">
            {formData.titre ||
              (isEditing ? "Détails de l'événement" : "Ajouter un événement")}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Détails complets de l'événement — JOJ Dakar 2026
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Colonne Gauche : Informations de l'événement */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/90 space-y-6">
            {/* Titre de section */}
            <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
              <span className="w-1.5 h-5 bg-blue-600 rounded-full" />
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                Informations de l'événement
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
              {/* Nom de l'événement */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Nom de l'événement <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  placeholder="Ex: Finale Basketball 3×3"
                  className="w-full px-4 py-3 bg-gray-50/70 rounded-xl border border-gray-200/80 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  required
                />
              </div>

              {/* Discipline */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Discipline <span className="text-rose-500">*</span>
                </label>
                <select
                  name="discipline"
                  value={formData.discipline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50/70 rounded-xl border border-gray-200/80 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  required
                >
                  <option value="">Sélectionner une discipline</option>
                  {allowedDisciplineIds.length > 0 ? (
                    <>
                      <optgroup label={`Disciplines autorisées (${selectedInfraObj?.nom})`}>
                        {disciplines
                          .filter((d) => allowedDisciplineIds.includes(d.id))
                          .map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.nom}
                            </option>
                          ))}
                      </optgroup>
                      <optgroup label="Autres disciplines (nécessite association au site)">
                        {disciplines
                          .filter((d) => !allowedDisciplineIds.includes(d.id))
                          .map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.nom} (Non autorisée dans ce lieu)
                            </option>
                          ))}
                      </optgroup>
                    </>
                  ) : (
                    disciplines.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.nom}
                      </option>
                    ))
                  )}
                </select>
                {selectedInfraObj &&
                  allowedDisciplineIds.length > 0 &&
                  Boolean(formData.discipline) &&
                  !allowedDisciplineIds.includes(Number(formData.discipline)) && (
                    <p className="text-xs text-amber-600 mt-1 font-medium">
                      ⚠️ "{selectedDisciplineObj?.nom || 'Cette discipline'}" n'est pas autorisée au "{selectedInfraObj.nom}". Activez-la dans "Sites Olympiques" ou choisissez une discipline autorisée.
                    </p>
                  )}
              </div>

              {/* Date de l'événement */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Date de l'événement <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                  <input
                    type="date"
                    name="date_debut"
                    value={formData.date_debut}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50/70 rounded-xl border border-gray-200/80 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              {/* Heure du début */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Heure du début <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                  <input
                    type="time"
                    name="heure_debut"
                    value={formData.heure_debut}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50/70 rounded-xl border border-gray-200/80 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              {/* Site / Lieu */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Site / Lieu <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <MapPin className="w-4 h-4 text-rose-500 absolute left-4 pointer-events-none" />
                  <select
                    name="infrastructure"
                    value={formData.infrastructure}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50/70 rounded-xl border border-gray-200/80 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                    required
                  >
                    <option value="">
                      Sélectionner un site / infrastructure
                    </option>
                    {infrastructures.map((inf) => (
                      <option key={inf.id} value={inf.id}>
                        {inf.nom} {inf.site?.nom ? `(${inf.site.nom})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Capacité Totale */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Capacité totale
                </label>
                <div className="relative flex items-center">
                  <Users className="w-4 h-4 text-emerald-600 absolute left-4 pointer-events-none" />
                  <input
                    type="number"
                    name="jauge_totale"
                    value={formData.jauge_totale}
                    onChange={handleChange}
                    placeholder="Capacité (ex: 5000)"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50/70 rounded-xl border border-gray-200/80 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* Statut de l'événement (Cartes radio) */}
            <div className="space-y-2 pt-2">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Statut de l'événement
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {STATUS_OPTIONS.map((opt) => {
                  const isSelected =
                    formData.statut === opt.id ||
                    (opt.id === "BROUILLON" && formData.statut === "PUBLIE");
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, statut: opt.id }))
                      }
                      className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                        isSelected
                          ? "border-emerald-500 bg-white shadow-xs ring-1 ring-emerald-500"
                          : "border-gray-200/80 bg-gray-50/50 hover:bg-gray-50"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {opt.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5 font-medium">
                          {opt.subtitle}
                        </p>
                      </div>
                      <div className="ml-3">
                        {isSelected ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                        ) : (
                          <span className="w-5 h-5 rounded-full border border-gray-300 inline-block" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions en bas du formulaire */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleDeleteSelf}
                    disabled={deleting || submitting}
                    className="px-5 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-sm font-bold transition flex items-center gap-2"
                  >
                    {deleting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Supprimer"
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-bold transition"
                >
                  Fermer
                </button>
              </div>

              <button
                type="submit"
                disabled={submitting || loadingOptions}
                className="px-7 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-sm font-bold text-white shadow-sm transition flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Enregistrement...</span>
                  </>
                ) : isEditing ? (
                  "Enregistrer les modifications"
                ) : (
                  "Créer l'événement"
                )}
              </button>
            </div>
          </div>

          {/* Colonne Droite : Image de couverture + Billetterie */}
          <div className="lg:col-span-4 space-y-6">
            {/* Carte Image de couverture */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/90 space-y-4">
              {/* Image box with badges */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center group shadow-xs">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={formData.titre || "Aperçu événement"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6 text-gray-400">
                    <Camera className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="text-xs font-medium">
                      Aucune image sélectionnée
                    </p>
                  </div>
                )}

                {/* Badge Discipline en bas à gauche */}
                {selectedDisciplineObj && (
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-[#0085FF] text-white text-[11px] font-bold tracking-wider px-3 py-1 rounded-md uppercase shadow-sm">
                      {disciplineDisplayName}
                    </span>
                  </div>
                )}

                {/* Bouton Favori en haut à droite */}
                <button
                  type="button"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition"
                  title="Favori"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite ? "fill-rose-500 text-rose-500" : "text-white"
                    }`}
                  />
                </button>
              </div>

              {/* Textes sous l'image */}
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Image de couverture
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  L'image principale affichée sur la plateforme publique.
                </p>
              </div>

              {/* Upload Dropzone */}
              <label className="block cursor-pointer">
                <div className="border border-dashed border-gray-300 rounded-2xl p-4 flex items-center gap-3.5 bg-gray-50/50 hover:bg-gray-50/90 transition">
                  <div className="p-2.5 rounded-xl bg-white border border-gray-200/80 text-gray-600 shadow-xs">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-blue-600 hover:underline">
                      Changer l'image
                    </p>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">
                      {imageFile
                        ? `${imageFile.name} • ${(imageFile.size / (1024 * 1024)).toFixed(1)} Mo`
                        : "Format image • Max 5 Mo"}
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Carte Billetterie */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/90 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-500">Billetterie</p>
                  <p className="text-2xl font-extrabold text-gray-900 tracking-tight mt-0.5">
                    {formData.prix !== ""
                      ? `${Number(formData.prix).toLocaleString("fr-FR")} FCFA`
                      : "Non défini"}
                  </p>
                </div>
                {formData.prix !== "" && Number(formData.prix) > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-500 text-[11px] font-bold">
                    <Zap className="w-3 h-3 fill-rose-500" />
                    <span>Vente rapide</span>
                  </span>
                )}
              </div>

              {/* Disponibilité */}
              <div className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100 flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/80">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    DISPONIBILITÉ
                  </p>
                  <p className="text-xs font-bold text-gray-900 mt-0.5">
                    {formData.jauge_totale !== ""
                      ? `Capacité totale : ${Number(formData.jauge_totale).toLocaleString("fr-FR")} places`
                      : "Capacité non définie"}
                  </p>
                </div>
              </div>

              {/* Note / Citation */}
              <p className="text-[11px] text-gray-400 italic text-center leading-relaxed">
                "Cet événement sera diffusé en direct sur les réseaux officiels
                des JOJ Dakar 2026."
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

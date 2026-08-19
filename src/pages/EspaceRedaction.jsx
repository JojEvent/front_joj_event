import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../composants/header";
import Footer from "../composants/footer";
import articlesService from "../services/articles.service";
import { UploadCloud, ChevronLeft, Info, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function EspaceRedaction() {
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    titre: "Les sprinteurs sénégalais se préparent pour l'or à Diamniadio",
    resume:
      "À quelques mois du lancement officiel des JOJ Dakar 2026, l'équipe nationale d'athlétisme peaufine ses réglages sur la toute nouvelle piste d'entraînement de Diamniadio. Récit exclusif d'une préparation intense.",
    statut: "EN_REVISION",
    discipline: "",
  });

  // Contenu HTML géré par la zone d'édition WYSIWYG
  const [htmlContenu, setHtmlContenu] = useState(
    "L'entraînement bat son plein sous le soleil de l'après-midi. À Diamniadio, les jeunes sprinteurs sénégalais mesurent chaque foulée. Sous la supervision rigoureuse du staff technique national, l'accent est mis sur l'explosivité au départ des starting-blocks.<br/><br/><b>\"Le niveau technique mondial exige une précision chirurgicale dès le premier appui,\"</b> explique l'entraîneur en chef. Les athlètes se plient à des séries répétées de 30 mètres chronométrées, analysées instantanément par vidéo.<br/><br/>Les athlètes bénéficient désormais d'installations flambant neuves, calquées sur les standards olympiques internationaux. La ferveur monte à l'idée de courir devant le public dakarois, qui attend cet événement de pied ferme depuis des années."
  );

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [disciplines, setDisciplines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Charger la liste REELLE des disciplines depuis le backend Django (GET /api/disciplines/)
  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const data = await articlesService.getDisciplines();
        const list = Array.isArray(data) ? data : data.results || [];
        setDisciplines(list);

        // Sélectionner automatiquement la première discipline disponible
        if (list.length > 0) {
          setFormData((prev) => ({
            ...prev,
            discipline: list[0].id,
          }));
        }
      } catch (err) {
        console.error("Erreur lors du chargement des disciplines depuis le backend :", err);
      }
    };
    fetchDisciplines();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 2. Commandes WYSIWYG interactives pour les boutons (Gras, Normal, Titre, Italique, etc.)
  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setHtmlContenu(editorRef.current.innerHTML);
    }
  };

  // Soumission au backend
  const handleSubmit = async (actionType) => {
    const contenuActuel = editorRef.current ? editorRef.current.innerHTML : htmlContenu;

    if (!formData.titre.trim()) {
      toast.error("Le titre de l'article est obligatoire.");
      return;
    }
    if (!formData.resume.trim()) {
      toast.error("Le chapeau / résumé est obligatoire.");
      return;
    }
    if (!contenuActuel.trim() || contenuActuel === "<br>") {
      toast.error("Le contenu de l'article est obligatoire.");
      return;
    }
    if (!formData.discipline) {
      toast.error("Veuillez sélectionner une catégorie sportive.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = new FormData();
      payload.append("titre", formData.titre);
      payload.append("resume", formData.resume);
      payload.append("contenu", contenuActuel);

      // Statut accepté par Django: PUBLIE ou BROUILLON
      const finalStatut = actionType === "publish" ? "PUBLIE" : "BROUILLON";
      payload.append("statut", finalStatut);
      payload.append("discipline", formData.discipline);

      if (image) {
        payload.append("image_principale", image);
      }

      await articlesService.createArticle(payload);

      toast.success(
        actionType === "publish"
          ? "Article publié avec succès !"
          : "Brouillon enregistré avec succès !"
      );

      setTimeout(() => {
        navigate("/articles");
      }, 1500);
    } catch (err) {
      console.error("Erreur lors de la soumission de l'article :", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.titre?.[0] ||
        "Une erreur est survenue lors de l'enregistrement.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-[1322px] w-full mx-auto px-4 lg:px-12 py-8">
        {/* Navigation fil d'ariane */}
        <Link
          to="/articles"
          className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 hover:text-sky-700 mb-4 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Tableau de bord rédacteur
        </Link>

        {/* Titre principal */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Espace Rédaction
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Rédigez, mettez en page et publiez vos articles officiels pour les JOJ Dakar 2026.
          </p>
        </div>

        {/* Layout principal 2 Colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Colonne Gauche : Formulaire de Rédaction (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Titre de l'article */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Titre de l'article *
              </label>
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                maxLength={100}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm transition-all"
                placeholder="Entrez un titre d'article..."
                required
              />
              <span className="text-[11px] text-slate-400 font-medium">
                Choisissez un titre accrocheur, clair et informatif de moins de 100 caractères.
              </span>
            </div>

            {/* Chapeau / Résumé */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Chapeau / Résumé de l'article *
              </label>
              <textarea
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm transition-all resize-none"
                placeholder="Rédigez le résumé introductif..."
                required
              />
              <span className="text-[11px] text-slate-400 font-medium">
                Le chapeau introduit l'article et s'affiche sur la page d'accueil (recommandé : 150-250 caractères).
              </span>
            </div>

            {/* Image Principale (Hero) */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Image Principale (Hero) *
              </label>
              <div
                onClick={() => document.getElementById("image-input-redaction").click()}
                className="relative w-full h-72 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 cursor-pointer group shadow-sm flex items-center justify-center"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Aperçu article"
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
                      alt="Hero par défaut"
                      className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
                    />
                  </div>
                )}

                <div className="relative z-10 p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex flex-col items-center gap-2 text-center text-white group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-8 h-8 text-sky-400" />
                  <span className="text-sm font-bold">
                    Glisser-déposer une nouvelle image pour la remplacer
                  </span>
                  <span className="text-[11px] text-slate-300">
                    Format recommandé : JPG ou PNG, min. 1920x1080px (Taille max: 8Mo)
                  </span>
                </div>

                <input
                  id="image-input-redaction"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Contenu de l'article avec barre d'édition WYSIWYG Fonctionnelle */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Contenu de l'article *
              </label>

              <div className="w-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                {/* Barre d'outils avec vraies commandes execCommand */}
                <div className="flex flex-wrap items-center gap-1.5 p-3 bg-slate-50 border-b border-slate-200 text-xs font-medium text-slate-700">
                  <button
                    type="button"
                    onClick={() => executeCommand("formatBlock", "<p>")}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 cursor-pointer"
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand("formatBlock", "<h1>")}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 font-bold cursor-pointer"
                  >
                    Titre 1
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand("formatBlock", "<h2>")}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 font-semibold cursor-pointer"
                  >
                    Titre 2
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand("bold")}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 font-bold cursor-pointer"
                  >
                    Gras
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand("italic")}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 italic cursor-pointer"
                  >
                    Italique
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand("underline")}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 underline cursor-pointer"
                  >
                    Souligné
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand("strikeThrough")}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 line-through cursor-pointer"
                  >
                    Barré
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand("formatBlock", "<blockquote>")}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 cursor-pointer"
                  >
                    Citation
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt("Entrez l'URL du lien :");
                      if (url) executeCommand("createLink", url);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 cursor-pointer"
                  >
                    Lien
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand("insertUnorderedList")}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 cursor-pointer"
                  >
                    Liste à puces
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand("formatBlock", "<pre>")}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 font-mono cursor-pointer"
                  >
                    Code
                  </button>
                </div>

                {/* Zone éditable WYSIWYG (contentEditable) */}
                <div
                  ref={editorRef}
                  contentEditable
                  onInput={() => setHtmlContenu(editorRef.current?.innerHTML || "")}
                  dangerouslySetInnerHTML={{ __html: htmlContenu }}
                  className="w-full p-4 min-h-[220px] text-slate-800 text-sm leading-relaxed font-normal focus:outline-none overflow-y-auto"
                />
              </div>
            </div>
          </div>

          {/* Colonne Droite : Sidebar Publication & Catégories (1 col) */}
          <div className="flex flex-col gap-6">
            {/* Boîte de publication */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-5">
              <h2 className="text-base font-bold text-slate-900">Publication</h2>

              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  STATUT DE L'ARTICLE
                </span>

                {/* Option 1 : Brouillon */}
                <label
                  onClick={() => setFormData((p) => ({ ...p, statut: "BROUILLON" }))}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.statut === "BROUILLON"
                      ? "border-sky-500 bg-sky-50/50 ring-1 ring-sky-500"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="statut"
                    checked={formData.statut === "BROUILLON"}
                    onChange={() => {}}
                    className="mt-1 text-sky-600 focus:ring-sky-500"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">Brouillon</span>
                    <span className="text-xs text-slate-500">
                      Sauvegarder pour continuer l'édition plus tard
                    </span>
                  </div>
                </label>

                {/* Option 2 : En révision */}
                <label
                  onClick={() => setFormData((p) => ({ ...p, statut: "EN_REVISION" }))}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.statut === "EN_REVISION"
                      ? "border-sky-500 bg-sky-50/50 ring-1 ring-sky-500"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="statut"
                    checked={formData.statut === "EN_REVISION"}
                    onChange={() => {}}
                    className="mt-1 text-sky-600 focus:ring-sky-500"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">En révision</span>
                    <span className="text-xs text-slate-500">
                      Envoyer pour vérification par les éditeurs
                    </span>
                  </div>
                </label>

                {/* Option 3 : Publié */}
                <label
                  onClick={() => setFormData((p) => ({ ...p, statut: "PUBLIE" }))}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.statut === "PUBLIE"
                      ? "border-sky-500 bg-sky-50/50 ring-1 ring-sky-500"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="statut"
                    checked={formData.statut === "PUBLIE"}
                    onChange={() => {}}
                    className="mt-1 text-sky-600 focus:ring-sky-500"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">Publié</span>
                    <span className="text-xs text-slate-500">
                      Rendre immédiatement public sur le portail
                    </span>
                  </div>
                </label>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSubmit("draft")}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  Enregistrer comme brouillon
                </button>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSubmit("publish")}
                  className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Soumettre pour publication"
                  )}
                </button>
              </div>
            </div>

            {/* Boîte Catégorie sportive (Chargée à 100% dynamiquement depuis l'API Backend Django disciplines/) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4">
              <h2 className="text-base font-bold text-slate-900">Catégorie sportive</h2>
              <p className="text-xs text-slate-500">
                Sélectionnez la discipline sportive associée à cet article.
              </p>

              {/* Affichage des vraies disciplines venant du backend Django */}
              <div className="flex flex-wrap gap-2">
                {disciplines.length === 0 ? (
                  <span className="text-xs text-slate-400 font-medium">
                    Chargement des disciplines...
                  </span>
                ) : (
                  disciplines.map((item) => {
                    const isSelected = String(formData.discipline) === String(item.id);

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            discipline: item.id,
                          }))
                        }
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-sky-600 text-white shadow-sm ring-2 ring-sky-500 ring-offset-1"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {isSelected ? `● ${item.nom}` : item.nom}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Notice Charte de Rédaction */}
            <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-5 flex items-start gap-3 text-sky-900">
              <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold">Charte de Rédaction</span>
                <p className="text-xs text-sky-800/90 leading-relaxed">
                  En publiant cet article, vous certifiez respecter le code déontologique des journalistes accrédités des JOJ Dakar 2026. Toute information doit être sourcée et vérifiée.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

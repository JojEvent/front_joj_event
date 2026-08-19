import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import Header from "../composants/header";
import Footer from "../composants/footer";
import articlesService from "../services/articles.service";
import RichTextEditor from "../composants/editor/RichTextEditor";
import HeroImageUpload from "../composants/editor/HeroImageUpload";

export default function EspaceRedaction() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: "",
    resume: "",
    contenu: "",
    statut: "BROUILLON",
    discipline: "",
  });
  const [image, setImage] = useState(null);
  const [disciplines, setDisciplines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDisciplines, setIsLoadingDisciplines] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Charger les disciplines depuis le backend
  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const data = await articlesService.getDisciplines();
        setDisciplines(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur lors du chargement des disciplines :", err);
        // En cas d'erreur, utiliser les données mock
        const mockDisciplines = [
          { id: 1, nom: "Athlétisme" },
          { id: 2, nom: "Cycling" },
          { id: 3, nom: "Football" },
          { id: 4, nom: "Natation" },
          { id: 5, nom: "Basketball" },
          { id: 6, nom: "Lutte" },
          { id: 7, nom: "Tennis" },
        ];
        setDisciplines(mockDisciplines);
      } finally {
        setIsLoadingDisciplines(false);
      }
    };
    fetchDisciplines();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      // Validation de la taille (8Mo max)
      if (file.size > 8 * 1024 * 1024) {
        setError("La taille de l'image ne doit pas dépasser 8Mo.");
        return;
      }
      setImage(file);
      setError(null);
    }
  }, []);

  const handleContentChange = useCallback((value) => {
    setFormData((prev) => ({ ...prev, contenu: value }));
  }, []);

  const handleSubmit = async (e, actionType) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Validation des champs obligatoires
    if (!formData.titre.trim()) {
      setError("Le titre est obligatoire.");
      setIsLoading(false);
      return;
    }
    if (!formData.resume.trim()) {
      setError("Le résumé est obligatoire.");
      setIsLoading(false);
      return;
    }
    if (!formData.contenu || formData.contenu === "<p><br></p>") {
      setError("Le contenu est obligatoire.");
      setIsLoading(false);
      return;
    }
    if (!formData.discipline) {
      setError("La catégorie sportive est obligatoire.");
      setIsLoading(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("titre", formData.titre);
      payload.append("resume", formData.resume);
      payload.append("contenu", formData.contenu);
      payload.append("statut", actionType === "publish" ? "PUBLIE" : "BROUILLON");
      payload.append("discipline", formData.discipline);
      if (image) {
        payload.append("image_principale", image);
      }

      await articlesService.createArticle(payload);

      setSuccess(
        actionType === "publish"
          ? "Article publié avec succès !"
          : "Article enregistré comme brouillon."
      );

      // Réinitialiser le formulaire
      setFormData({
        titre: "",
        resume: "",
        contenu: "",
        statut: "BROUILLON",
        discipline: "",
      });
      setImage(null);

      // Rediriger vers la liste des articles après 2 secondes
      setTimeout(() => {
        navigate("/articles");
      }, 2000);
    } catch (err) {
      console.error("Erreur lors de la soumission :", err);
      setError(
        err.response?.data?.detail ||
          "Une erreur est survenue lors de l'enregistrement."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion des statuts
  const statusOptions = [
    {
      id: "BROUILLON",
      title: "Brouillon",
      description: "Sauvegarder pour continuer l'édition plus tard",
    },
    {
      id: "EN_REVISION",
      title: "En révision",
      description: "Envoyer pour vérification par les éditeurs",
    },
    {
      id: "PUBLIE",
      title: "Publié",
      description: "Rendre immédiatement public sur le portail",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link
              to="/tableau-de-bord"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              style={{ fontFamily: '"Olympic_sans_medium", sans-serif' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Tableau de bord rédacteur
            </Link>
          </nav>

          {/* Titre et description */}
          <div className="mb-8">
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              style={{ 
                fontFamily: '"Olympic_headline", sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              Espace Rédaction
            </h1>
            <p
              className="text-lg text-gray-600"
              style={{ fontFamily: '"Olympic_sans", sans-serif' }}
            >
              Rédigez, mettez en page et publiez vos articles officiels pour les JOJ Dakar 2026.
            </p>
          </div>

          {/* Messages d'erreur et de succès */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
              {success}
            </div>
          )}

          {/* Contenu principal en deux colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne gauche (2/3) */}
            <div className="lg:col-span-2 space-y-8">
              <form className="space-y-8">
                {/* Champ Titre */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    style={{ fontFamily: '"Olympic_sans_medium", sans-serif' }}
                  >
                    Titre de l'article *
                  </label>
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    style={{ fontFamily: '"Olympic_sans", sans-serif' }}
                    placeholder="Les sprinteurs sénégalais se préparent pour l'or à Diamniadio"
                    maxLength={100}
                    required
                  />
                  <p
                    className="text-xs text-gray-500"
                    style={{ fontFamily: '"Olympic_sans", sans-serif' }}
                  >
                    Choisissez un titre accrocheur, clair et informatif de moins de 100 caractères.
                  </p>
                </div>

                {/* Champ Chapeau / Résumé */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    style={{ fontFamily: '"Olympic_sans_medium", sans-serif' }}
                  >
                    Chapeau / Résumé de l'article *
                  </label>
                  <textarea
                    name="resume"
                    value={formData.resume}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    style={{ fontFamily: '"Olympic_sans", sans-serif' }}
                    placeholder="À quelques mois du lancement officiel des JOJ Dakar 2026, l'équipe nationale d'athlétisme peaufine ses réglages..."
                    rows={4}
                    maxLength={250}
                    required
                  />
                  <p
                    className="text-xs text-gray-500"
                    style={{ fontFamily: '"Olympic_sans", sans-serif' }}
                  >
                    Le chapeau introduit l'article et s'affiche sur la page d'accueil (recommandé : 150-250 caractères).
                  </p>
                </div>

                {/* Image Principale (Hero) */}
                <div className="space-y-3">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    style={{ fontFamily: '"Olympic_sans_medium", sans-serif' }}
                  >
                    Image Principale (Hero) *
                  </label>
                  <HeroImageUpload
                    image={image}
                    onImageChange={handleImageChange}
                  />
                </div>

                {/* Contenu de l'article avec éditeur riche */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    style={{ fontFamily: '"Olympic_sans_medium", sans-serif' }}
                  >
                    Contenu de l'article *
                  </label>
                  <RichTextEditor
                    value={formData.contenu}
                    onChange={handleContentChange}
                    placeholder="Commencez à écrire votre article..."
                  />
                </div>
              </form>
            </div>

            {/* Colonne droite (1/3) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Carte Publication */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2
                  className="text-xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: '"Olympic_sans_medium", sans-serif' }}
                >
                  Publication
                </h2>
                <div className="mb-6">
                  <label
                    className="block text-sm font-medium text-gray-500 mb-3"
                    style={{ fontFamily: '"Olympic_sans_medium", sans-serif' }}
                  >
                    STATUT DE L'ARTICLE
                  </label>
                  <div className="space-y-3">
                    {statusOptions.map((option) => {
                      const isSelected = formData.statut === option.id;
                      return (
                        <label
                          key={option.id}
                          className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-50 border-blue-500'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="statut"
                            value={option.id}
                            checked={isSelected}
                            onChange={() => 
                              setFormData((prev) => ({ ...prev, statut: option.id }))
                            }
                            className="w-5 h-5 mt-1 text-blue-600"
                          />
                          <div>
                            <div
                              className="font-medium text-gray-900"
                              style={{ fontFamily: '"Olympic_sans_medium", sans-serif' }}
                            >
                              {option.title}
                            </div>
                            <div
                              className="text-sm text-gray-500"
                              style={{ fontFamily: '"Olympic_sans", sans-serif' }}
                            >
                              {option.description}
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
                
                {/* Boutons de publication */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, "draft")}
                    disabled={isLoading}
                    className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    style={{ fontFamily: '"Olympic_sans_medium", sans-serif' }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      "Enregistrer comme brouillon"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, "publish")}
                    disabled={isLoading}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    style={{ 
                      fontFamily: '"Olympic_sans_medium", sans-serif',
                      backgroundColor: '#0284c7'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Publication...
                      </>
                    ) : (
                      "Soumettre pour publication"
                    )}
                  </button>
                </div>
              </div>

              {/* Carte Catégorie sportive */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2
                  className="text-xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: '"Olympic_sans_medium", sans-serif' }}
                >
                  Catégorie sportive
                </h2>
                <p
                  className="text-sm text-gray-600 mb-4"
                  style={{ fontFamily: '"Olympic_sans", sans-serif' }}
                >
                  Sélectionnez le sport correspondant à cet article.
                </p>
                {isLoadingDisciplines ? (
                  <p className="text-sm text-gray-500">Chargement des catégories...</p>
                ) : disciplines.length === 0 ? (
                  <p className="text-sm text-gray-500">Aucune catégorie disponible.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {disciplines.map((discipline) => {
                      const isSelected = formData.discipline === discipline.id;
                      
                      return (
                        <button
                          key={discipline.id}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              discipline: isSelected ? "" : discipline.id,
                            }));
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm flex items-center gap-2 ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                          }`}
                          style={{ 
                            fontFamily: '"Olympic_sans", sans-serif',
                            backgroundColor: isSelected ? '#0284c7' : 'white',
                            borderColor: isSelected ? '#0284c7' : '#d1d5db'
                          }}
                        >
                          {isSelected && (
                            <span className="w-2 h-2 bg-white rounded-full" />
                          )}
                          {discipline.nom}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Carte Charte de Rédaction */}
              <div
                className="bg-blue-50 border border-blue-200 rounded-xl p-6"
                style={{ backgroundColor: '#eff6ff' }}
              >
                <h3
                  className="text-lg font-bold text-blue-600 mb-3 flex items-center gap-2"
                  style={{ 
                    fontFamily: '"Olympic_sans_medium", sans-serif',
                    color: '#0284c7'
                  }}
                >
                  <span>ℹ️</span>
                  Charte de Rédaction
                </h3>
                <p
                  className="text-sm text-gray-700"
                  style={{ fontFamily: '"Olympic_sans", sans-serif' }}
                >
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

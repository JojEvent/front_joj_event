import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../composants/header";
import Footer from "../composants/footer";
import articlesService from "../services/articles.service";
import { UploadCloud, Loader2 } from "lucide-react";

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
    // DONNÉES TEMPORAIRES POUR TEST - À REMPLACER PAR L'API PLUS TARD
    const mockDisciplines = [
      { id: 1, nom: "Athlétisme" },
      { id: 2, nom: "Cycling" },
      { id: 3, nom: "Football" },
      { id: 4, nom: "Natation" },
      { id: 5, nom: "Basketball" },
      { id: 6, nom: "Lutte" },
      { id: 7, nom: "Tennis" }
    ];
    setDisciplines(mockDisciplines);
    setIsLoadingDisciplines(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e, actionType) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section principale */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-2">Espace Rédaction</h1>
              <p className="text-gray-600">
                Rédigez, mettez en page et publiez vos articles officiels pour les JOJ Dakar 2026.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
            )}
            {success && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">{success}</div>
            )}

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Titre de l'article *
                </label>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Ex: Les sprinteurs sénégalais se préparent pour l'or à Diamniadio"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Résumé de l'article *
                </label>
                <textarea
                  name="resume"
                  value={formData.resume}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 h-20"
                  placeholder="Résumé court de l'article (150-250 caractères)"
                  required
                />
              </div>

              {/* Upload d'image */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Image principale *
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
                  onClick={() => document.getElementById("image-upload").click()}
                >
                  {image ? (
                    <div>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="mx-auto mb-2 max-h-40 rounded-lg"
                      />
                      <p className="text-sm text-gray-500">
                        {image.name} (Cliquez pour changer)
                      </p>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="text-4xl text-blue-500 mx-auto mb-2" />
                      <p className="text-gray-500">
                        Glisser-déposer une image ici pour le téléchargement
                      </p>
                    </>
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Contenu de l'article *
                </label>
                <textarea
                  name="contenu"
                  value={formData.contenu}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 h-64"
                  placeholder="Ex: À quelques mois des JOJ Dakar 2026, l'espoir national d'athlétisme s'entraîne dur..."
                  required
                />
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Publication</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-500 mb-3">
                  STATUT DE L'ARTICLE
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="statut"
                      value="BROUILLON"
                      checked={formData.statut === "BROUILLON"}
                      onChange={(e) => setFormData((prev) => ({ ...prev, statut: e.target.value }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <div className="font-medium">Brouillon</div>
                      <div className="text-sm text-gray-500">Sauvegarder pour continuer l'édition plus tard</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 bg-blue-50 border-blue-200">
                    <input
                      type="radio"
                      name="statut"
                      value="EN_REVISION"
                      checked={formData.statut === "EN_REVISION"}
                      onChange={(e) => setFormData((prev) => ({ ...prev, statut: e.target.value }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <div className="font-medium">En révision</div>
                      <div className="text-sm text-gray-500">Envoyer pour vérification par les éditeurs</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="statut"
                      value="PUBLIE"
                      checked={formData.statut === "PUBLIE"}
                      onChange={(e) => setFormData((prev) => ({ ...prev, statut: e.target.value }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <div className="font-medium">Publié</div>
                      <div className="text-sm text-gray-500">Rendre immédiatement public sur le portail</div>
                    </div>
                  </label>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, "draft")}
                disabled={isLoading}
                className="w-full py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 mb-3"
              >
                Enregistrer comme brouillon
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, "publish")}
                disabled={isLoading}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Soumettre pour publication
              </button>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Catégorie sportive</h2>
              <p className="text-sm text-gray-600 mb-4">
                Sélectionnez le sport correspondant à cet article.
              </p>
              {isLoadingDisciplines ? (
                <p className="text-sm text-gray-500">Chargement des catégories...</p>
              ) : disciplines.length === 0 ? (
                <p className="text-sm text-gray-500">Aucune catégorie disponible. Vérifiez que le backend retourne des disciplines.</p>
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
                            discipline: isSelected ? "" : discipline.id 
                          }));
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm flex items-center gap-2 ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 bg-white rounded-full" />}
                        {discipline.nom}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span>ℹ️</span>
                Charte de Rédaction
              </h3>
              <p className="text-sm text-gray-700">
                En publiant cet article, vous certifiez respecter le code déontologique des journalistes accrédités des JOJ Dakar 2026. Toute information doit être sourcée et vérifiée.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../composants/header";
import Footer from "../composants/footer";
import articlesService from "../services/articles.service";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await articlesService.getArticles({ statut: "PUBLIE" });
        setArticles(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des articles :", err);
        setError("Impossible de charger les articles.");
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-1">
          <p className="text-center">Chargement...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-1">
          <p className="text-center text-red-500">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tous les articles</h1>
          <Link
            to="/redaction"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Nouveau article
          </Link>
        </div>
        
        {articles.length === 0 ? (
          <p className="text-center text-gray-500">Aucun article publié.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.id}`}
                className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {article.image_principale && (
                  <img
                    src={article.image_principale}
                    alt={article.titre}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-medium mb-2">
                    {article.discipline?.nom}
                  </div>
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.titre}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.resume}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{formatDate(article.published_at || article.created_at)}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        article.statut === "PUBLIE"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {article.statut}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

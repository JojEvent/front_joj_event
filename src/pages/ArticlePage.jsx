import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../composants/header";
import Footer from "../composants/footer";
import articlesService from "../services/articles.service";

export default function ArticlePage() {
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await articlesService.getArticles({ statut: "PUBLIE" });
        if (Array.isArray(data) && data.length > 0) {
          setFeaturedArticle(data[0]);
          setArticles(data.slice(1, 4));
        }
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
          <p className="text-center">Chargement des articles...</p>
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
        {/* Article principal */}
        {featuredArticle && (
          <article className="mb-12">
            <div className="text-sm text-gray-500 mb-2">
              {featuredArticle.discipline?.nom || "CATÉGORIE"}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {featuredArticle.titre}
            </h1>
            {featuredArticle.image_principale && (
              <img
                src={`http://127.0.0.1:8000${featuredArticle.image_principale}`}
                alt={featuredArticle.titre}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
              />
            )}
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4 text-lg">{featuredArticle.resume}</p>
              <div
                className="mb-6"
                dangerouslySetInnerHTML={{ __html: featuredArticle.contenu }}
              />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-8 pt-4 border-t">
              <span>Par JOJ EVENT</span>
              <span>• {formatDate(featuredArticle.published_at || featuredArticle.created_at)}</span>
            </div>
          </article>
        )}

        {/* Section Journal Olympique */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            JOURNAL OLYMPIQUE
          </h2>
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
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Par JOJ EVENT</span>
                    <span>• {formatDate(article.published_at || article.created_at)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../composants/header";
import Footer from "../composants/footer";
import { instance } from "../services/api";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger l'article
        const articleResponse = await instance.get(`/api/articles/${id}/`);
        setArticle(articleResponse.data);

        // Charger les articles liés (même discipline, autres articles publiés)
        const relatedResponse = await instance.get(
          `/api/articles/?statut=PUBLIE&discipline=${articleResponse.data.discipline?.id}&limit=3`
        );
        // Filtrer pour exclure l'article actuel
        setRelatedArticles(
          relatedResponse.data.filter((a) => a.id !== articleResponse.data.id).slice(0, 3)
        );
        setIsLoading(false);
      } catch (err) {
        console.error("Erreur :", err);
        setError("Article introuvable.");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
          <Link to="/articles" className="block text-center mt-4 text-blue-600">
            Retour à la liste
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <article className="mb-12">
          <div className="text-sm text-gray-500 mb-2">
            {article.discipline?.nom || "CATÉGORIE"}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {article.titre}
          </h1>
          {article.image_principale && (
            <img
              src={`http://127.0.0.1:8000${article.image_principale}`}
              alt={article.titre}
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
            />
          )}
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4 text-lg">{article.resume}</p>
            <div
              className="mb-6"
              dangerouslySetInnerHTML={{ __html: article.contenu }}
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-8 pt-4 border-t">
            <span>Par JOJ EVENT</span>
            <span>• {formatDate(article.published_at || article.created_at)}</span>
          </div>
        </article>

        {/* Articles liés */}
        {relatedArticles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-8">Articles similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/articles/${related.id}`}
                  className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {related.image_principale && (
                    <img
                      src={`http://127.0.0.1:8000${related.image_principale}`}
                      alt={related.titre}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="text-sm text-blue-600 font-medium mb-2">
                      {related.discipline?.nom}
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">{related.titre}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{related.resume}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Link
          to="/articles"
          className="inline-block px-6 py-2 border rounded-md hover:bg-gray-100"
        >
          Retour à la liste
        </Link>
      </main>
      <Footer />
    </div>
  );
}

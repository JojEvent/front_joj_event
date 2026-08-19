import React from "react";
import { Link } from "react-router-dom";
import { formatArticleDate } from "../../utils/formatDate";

const CATEGORY_STYLES = {
  ATHLÉTISME: "bg-blue-50 text-blue-700",
  ATHLETISME: "bg-blue-50 text-blue-700",
  BASKETBALL: "bg-purple-50 text-purple-700",
  "BASKET-BALL": "bg-purple-50 text-purple-700",
  "BASKET-BALL 3X3": "bg-purple-50 text-purple-700",
  NATATION: "bg-emerald-50 text-emerald-700",
  LUTTE: "bg-amber-50 text-amber-800",
  FOOTBALL: "bg-teal-50 text-teal-700",
  JUDO: "bg-sky-50 text-sky-700",
  DEFAULT: "bg-slate-100 text-slate-700",
};

function getCategoryBadgeStyle(categoryName) {
  if (!categoryName) return CATEGORY_STYLES.DEFAULT;
  const normalized = categoryName.toUpperCase().trim();
  return CATEGORY_STYLES[normalized] || CATEGORY_STYLES.DEFAULT;
}

export default function RecentArticles({ articles = [] }) {
  const displayArticles = Array.isArray(articles) ? articles.slice(0, 4) : [];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)] border border-gray-100/80 flex flex-col h-full min-h-[300px]">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">
          Derniers articles publiés
        </h3>
        {displayArticles.length > 0 && (
          <Link
            to="/admin/evenement"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Voir tout
          </Link>
        )}
      </div>

      {displayArticles.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
          <p className="text-sm text-gray-400 font-normal">
            Aucun article publié pour le moment.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100 flex-1">
          {displayArticles.map((article) => {
            const category = article.discipline_nom || article.discipline?.nom || "Sport";
            const authorName = article.auteur || article.author_name || "Rédaction";
            const formattedDate = formatArticleDate(article.published_at || article.created_at);

            return (
              <div key={article.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <span
                    className={`px-2.5 py-1 rounded text-[11px] font-bold tracking-wider uppercase shrink-0 ${getCategoryBadgeStyle(
                      category
                    )}`}
                  >
                    {category}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 leading-snug truncate">
                      {article.titre}
                    </h4>
                    <div className="flex justify-between items-center mt-1.5 text-xs text-gray-400">
                      <span className="font-normal text-gray-500 truncate">{authorName}</span>
                      <span className="shrink-0 ml-2">{formattedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

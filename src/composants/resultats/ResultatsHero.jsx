import React from "react";

/**
 * Composant ResultatsHero
 * En-tête principal de la page résultats selon la maquette Figma.
 */
const ResultatsHero = () => {
  return (
    <section className="w-full text-center py-10 px-4">
      {/* Titre principal avec mot "direct" en vert */}
      <h1 className="text-4xl sm:text-5xl font-extrabold font-olympic-headline text-black tracking-tight">
        Résultats en <span className="text-emerald-500">direct</span>
      </h1>

      {/* Paragraphe explicatif */}
      <p className="max-w-2xl mx-auto mt-4 text-gray-500 font-olympic text-sm sm:text-base leading-relaxed">
        Suivez les scores, statistiques, et mises à jour des JOJEVENT Dakar 2026 en temps réel avec une couverture complète de toutes les disciplines.
      </p>

      {/* Bouton bleu "Voir tous les résultats en direct" */}
      <div className="mt-6 flex justify-center">
        <button className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold font-olympic rounded-lg shadow-sm transition-colors cursor-pointer">
          Voir tous les résultats en direct
        </button>
      </div>
    </section>
  );
};

export default ResultatsHero;

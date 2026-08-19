import React from "react";

/**
 * Composant FluxActualitesDirect
 * Cartes du fil d'actualité des temps forts en direct conforme à la maquette Figma.
 */
const FluxActualitesDirect = ({ listeActualites }) => {
  // Cartes par défaut conformes à la maquette Figma
  const actualites = listeActualites || [
    {
      id: 1,
      heure: "10:30",
      tag: "BUT !",
      tagType: "but",
      titre: "Sénégal U18 marque un second but décisif !",
      description: "2 - 1 vs Maroc U18",
      discipline: "Football",
      lieu: "Stade Abdoulaye Wade",
    },
    {
      id: 2,
      heure: "10:22",
      tag: "RECORD",
      tagType: "record",
      titre: "Nouveau Record !",
      description: "48.2s - 100m (Nage libre Papaye Ndiaye SEN)",
      discipline: "Natation",
      lieu: "Piscine Olympique Dakar",
    },
    {
      id: 3,
      heure: "10:15",
      tag: "FIN D'ÉPREUVE",
      tagType: "fin",
      titre: "Course terminée",
      description: "Final Hommes - 200m (1. M. Diallo)",
      discipline: "Athlétisme",
      lieu: "Stade Léopold Sédar Senghor",
    },
    {
      id: 4,
      heure: "10:05",
      tag: "MISE À JOUR",
      tagType: "maj",
      titre: "Changement d'horaire",
      description: "Basketball Filles U10 (Décalé à 16h)",
      discipline: "Basket",
      lieu: "Stade de Dakar",
    },
    {
      id: 5,
      heure: "10:02",
      tag: "NOUVEAU RECORD",
      tagType: "record",
      titre: "Record battu !",
      description: "Épaulé - jeté - 87kg",
      discipline: "Haltérophilie",
      lieu: "Centre Handisport",
    },
  ];

  return (
    <section className="w-full max-w-[1220px] mx-auto px-4">
      
      {/* En-tête avec bouton filtre */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold font-olympic-headline text-gray-900">
          Flux d'Actualités en Direct
        </h2>

        <div className="flex items-center gap-2">
          <span className="text-xs font-olympic text-gray-500">Filtrer par :</span>
          <button className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-full text-xs font-bold font-olympic transition shadow-sm">
            Tous les sports
          </button>
        </div>
      </div>

      {/* Grille horizontale des cartes d'actualités */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {actualites.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-stone-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
          >
            {/* Ligne 1 : Heure + Puce rouge + Tag événement */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold font-olympic mb-2">
                <span className="text-gray-400">{item.heure}</span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              </div>

              {/* Tag évènement (en rouge majuscule) */}
              <span className="text-[10px] font-bold font-olympic text-red-600 uppercase tracking-wider block mb-1">
                {item.tag}
              </span>

              {/* Titre de la carte */}
              <h3 className="text-sm font-bold font-olympic-headline text-gray-900 leading-snug mb-1">
                {item.titre}
              </h3>

              {/* Description */}
              <p className="text-xs font-olympic text-gray-500 leading-relaxed mb-3">
                {item.description}
              </p>
            </div>

            {/* Pied de la carte : Discipline & Lieu */}
            <div className="pt-2 border-t border-stone-100 mt-2">
              <span className="block text-xs font-bold font-olympic text-gray-900">
                {item.discipline}
              </span>
              <span className="block text-[10px] font-olympic text-gray-400 truncate">
                {item.lieu}
              </span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

export default FluxActualitesDirect;

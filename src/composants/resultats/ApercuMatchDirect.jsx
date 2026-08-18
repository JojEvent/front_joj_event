import React from "react";
import { Eye, Bell, Share2, Clock, MapPin, Users } from "lucide-react";

// Drapeaux SVG propres pour le Sénégal et le Maroc
const DrapeauSenegal = () => (
  <div className="w-12 h-10 rounded-md overflow-hidden shadow-sm flex border border-black/10">
    <div className="w-1/3 bg-green-600 h-full flex items-center justify-center">
      <span className="text-yellow-400 text-xs font-bold">★</span>
    </div>
    <div className="w-1/3 bg-yellow-400 h-full" />
    <div className="w-1/3 bg-red-600 h-full" />
  </div>
);

const DrapeauMaroc = () => (
  <div className="w-12 h-10 rounded-md overflow-hidden shadow-sm bg-red-600 border border-black/10 flex items-center justify-center">
    <span className="text-emerald-500 text-sm font-bold">★</span>
  </div>
);

/**
 * Composant ApercuMatchDirect
 * Affiche les détails complets du match vedette en direct selon la maquette Figma.
 */
const ApercuMatchDirect = ({ matchDonnees }) => {
  // Valeurs par défaut basées sur la maquette Figma si aucune donnée n'est transmise
  const match = matchDonnees || {
    discipline: "Football Garçons u18",
    phase: "PHASE FINALE",
    categorie: "DEMI-FINALE",
    equipeDomicile: "Sénégal u18",
    equipeExterieur: "Maroc u18",
    scoreDomicile: 4,
    scoreExterieur: 0,
    tempsJoue: "76'",
    heureLocale: "Aujourd'hui, 16h30",
    lieuMatch: "Stade Abdoulaye Wade Dakar, Sénégal",
    affluenceMatch: "12 450 spectateurs",
  };

  return (
    <section className="w-full max-w-[1220px] mx-auto px-4">
      {/* En-tête de section avec badge EN DIRECT */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold font-olympic-headline text-gray-900">
            Aperçu du Match en Direct
          </h2>
          <p className="text-xs font-olympic text-gray-400 mt-0.5">
            Action clé et informations du stade
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold font-olympic uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          EN DIRECT
        </div>
      </div>

      {/* Carte principale du match */}
      <div className="bg-stone-50/60 border border-stone-200 rounded-2xl p-6 shadow-sm">
        
        {/* Contenu principal : 3 colonnes (Discipline | Score & Équipes | Infos Lieu) */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 pb-6 border-b border-stone-200">
          
          {/* Colonne Gauche : Icône + Discipline */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-stone-200 pb-4 md:pb-0 md:pr-4">
            <div className="w-12 h-12 rounded-full bg-stone-200/70 flex items-center justify-center mb-2">
              <span className="text-xl">⚽</span>
            </div>
            <span className="text-base font-bold font-olympic-headline text-gray-900">
              {match.discipline}
            </span>
            <span className="text-xs font-bold text-gray-400 font-olympic mt-0.5">
              {match.phase}
            </span>
          </div>

          {/* Colonne Centre : Équipes + Score + Temps */}
          <div className="md:col-span-6 flex flex-col items-center justify-center">
            {/* Tag Categorie (ex: DEMI-FINALE en rouge) */}
            <span className="text-xs font-bold font-olympic text-red-600 uppercase tracking-wider mb-2">
              {match.categorie}
            </span>

            {/* Zone du score */}
            <div className="flex items-center justify-center gap-6 sm:gap-10">
              {/* Équipe Domicile */}
              <div className="flex flex-col items-center gap-2">
                <DrapeauSenegal />
                <span className="text-sm font-bold font-olympic text-gray-800">
                  {match.equipeDomicile}
                </span>
              </div>

              {/* Score */}
              <div className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl font-black font-olympic-headline text-gray-900 tracking-tight">
                  {match.scoreDomicile} — {match.scoreExterieur}
                </span>
                <span className="mt-2 bg-black text-white text-xs font-bold px-3 py-0.5 rounded-md font-olympic">
                  {match.tempsJoue}
                </span>
              </div>

              {/* Équipe Extérieur */}
              <div className="flex flex-col items-center gap-2">
                <DrapeauMaroc />
                <span className="text-sm font-bold font-olympic text-gray-800">
                  {match.equipeExterieur}
                </span>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Infos du Stade */}
          <div className="md:col-span-3 flex flex-col gap-3 text-xs font-olympic text-gray-600 border-t md:border-t-0 md:border-l border-stone-200 pt-4 md:pt-0 md:pl-6">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-gray-400 uppercase text-[10px]">HEURE LOCALE</span>
                <span className="font-semibold text-gray-800">{match.heureLocale}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-gray-400 uppercase text-[10px]">LIEU</span>
                <span className="font-semibold text-gray-800">{match.lieuMatch}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-gray-400 uppercase text-[10px]">AFFLUENCE</span>
                <span className="font-semibold text-gray-800">{match.affluenceMatch}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Boutons d'action sous le match */}
        <div className="mt-4 pt-2 flex flex-wrap items-center justify-center gap-3">
          <button className="px-4 py-2 bg-white border border-stone-300 rounded-lg text-xs font-bold font-olympic text-gray-700 hover:bg-stone-100 flex items-center gap-1.5 transition">
            <Eye className="w-3.5 h-3.5" /> Voir les détails
          </button>
          
          <button className="px-4 py-2 bg-white border border-stone-300 rounded-lg text-xs font-bold font-olympic text-gray-700 hover:bg-stone-100 flex items-center gap-1.5 transition">
            <Bell className="w-3.5 h-3.5" /> Activer les notifications
          </button>
          
          <button className="px-4 py-2 bg-white border border-stone-300 rounded-lg text-xs font-bold font-olympic text-gray-700 hover:bg-stone-100 flex items-center gap-1.5 transition">
            <Share2 className="w-3.5 h-3.5" /> Partager
          </button>
        </div>

      </div>
    </section>
  );
};

export default ApercuMatchDirect;

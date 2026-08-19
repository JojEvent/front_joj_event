import React from "react";
import { TrendingUp, ChevronRight } from "lucide-react";

/**
 * Composant TableauMedaillesDirect
 * Tableau du classement officiel des médailles en direct conforme à la maquette Figma.
 */
const TableauMedaillesDirect = ({ listeMedailles }) => {
  // Données par défaut issues de la maquette Figma
  const medailles = listeMedailles || [
    { rang: 1, pays: "Sénégal", drapeau: "🇸🇳", or: 32, argent: 32, bronze: 32, total: 96 },
    { rang: 2, pays: "France", drapeau: "🇫🇷", or: 30, argent: 32, bronze: 32, total: 96 },
    { rang: 3, pays: "USA", drapeau: "🇺🇸", or: 22, argent: 32, bronze: 32, total: 96 },
    { rang: 4, pays: "Nigéria", drapeau: "🇳🇬", or: 12, argent: 32, bronze: 32, total: 96 },
  ];

  return (
    <section className="w-full max-w-[1220px] mx-auto px-4">
      
      {/* Titre et lien voir classement complet */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-olympic-headline text-gray-900">
          Tableau des Médailles en Direct
        </h2>

        <button className="text-xs font-bold font-olympic text-sky-600 hover:underline flex items-center gap-0.5">
          Voir le classement complet <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Conteneur du tableau */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-olympic">
            
            {/* En-tête bleu Figma */}
            <thead>
              <tr className="bg-sky-600 text-white text-xs font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">PAYS / ÉQUIPE</th>
                <th className="py-3.5 px-4 text-center">
                  <span className="inline-block mr-1">🥇</span> OR
                </th>
                <th className="py-3.5 px-4 text-center">
                  <span className="inline-block mr-1">🥈</span> SILVER
                </th>
                <th className="py-3.5 px-4 text-center">
                  <span className="inline-block mr-1">🥉</span> BRONZE
                </th>
                <th className="py-3.5 px-4 text-center font-black">TOTAL</th>
                <th className="py-3.5 px-4 text-center">TEND.</th>
              </tr>
            </thead>

            {/* Lignes de classement */}
            <tbody className="divide-y divide-stone-100 text-sm text-gray-800">
              {medailles.map((item) => (
                <tr key={item.rang} className="hover:bg-stone-50 transition-colors">
                  <td className="py-4 px-4 text-center font-bold text-gray-900">
                    {item.rang}
                  </td>

                  <td className="py-4 px-4 flex items-center gap-3">
                    <span className="text-xl leading-none">{item.drapeau}</span>
                    <span className="font-bold text-gray-900">{item.pays}</span>
                  </td>

                  <td className="py-4 px-4 text-center font-bold">{item.or}</td>
                  <td className="py-4 px-4 text-center font-bold">{item.argent}</td>
                  <td className="py-4 px-4 text-center font-bold">{item.bronze}</td>
                  <td className="py-4 px-4 text-center font-black text-gray-900 bg-stone-50/60">
                    {item.total}
                  </td>

                  <td className="py-4 px-4 text-center">
                    <TrendingUp className="w-4 h-4 text-gray-600 mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Bouton bas : VOIR PLUS DE PAYS */}
        <button className="w-full py-3 bg-stone-100/70 hover:bg-stone-200 text-gray-600 text-xs font-bold font-olympic uppercase tracking-wider text-center transition">
          VOIR PLUS DE PAYS
        </button>
      </div>

    </section>
  );
};

export default TableauMedaillesDirect;

// components/domain/panier/CartItemCard.jsx
import React from "react";

function formatFcfa(amount) {
  return `${amount.toLocaleString("fr-FR")} Fcfa`;
}

/**
 * Carte d'un article du panier (billet réservé).
 * @param {object} item - un élément de cartItemsMock
 * @param {(id:string) => void} onEdit
 * @param {(id:string) => void} onDelete
 */
export default function CartItemCard({ item, onEdit, onDelete }) {
  return (
    <div className="w-full flex items-center gap-3.5">
      <img
        className="w-44 h-40 rounded-lg object-cover"
        src={item.image}
        alt={item.eventTitle}
      />
      <div className="flex-1 flex justify-between items-center gap-6">
        <div className="flex-1 flex flex-col justify-start items-start gap-4">
          <p className="text-neutral-800 text-2xl font-bold font-['Olympic_Sans_Bold'] line-clamp-1">
            {item.eventTitle}
          </p>
          <p className="text-neutral-600 text-base font-medium font-['Inter'] line-clamp-1">
            {item.dateLabel} . {item.ticketType}
          </p>
          <p className="text-neutral-800 text-base font-normal font-['Inter'] line-clamp-1">
            {item.seatInfo}
          </p>
          <p className="text-neutral-800 text-base font-bold font-['Olympic_Headline']">
            prix {formatFcfa(item.unitPrice)}
          </p>
        </div>

        <div className="flex flex-col justify-between items-center gap-6">
          <button
            type="button"
            onClick={() => onEdit?.(item.id)}
            className="flex items-center gap-2 text-slate-900 text-base font-medium font-['Inter']"
          >
            Modifier
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(item.id)}
            aria-label={`Supprimer ${item.eventTitle}`}
            className="text-neutral-800"
          >
            <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
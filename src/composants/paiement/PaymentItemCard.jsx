import React from "react";

/**
 * Composant d'affichage d'un article réservé dans le récapitulatif de paiement.
 * Principe de Responsabilité Unique : Afficher la carte d'un billet/événement réservé.
 */
export default function PaymentItemCard({ item }) {
  const {
    eventTitle,
    dateLabel,
    ticketType,
    seatInfo,
    unitPrice,
    image,
  } = item;

  return (
    <article className="w-full flex items-start gap-4 pb-6 border-b border-gray-100">
      {/* Image de l'événement */}
      <div className="w-36 h-28 shrink-0 rounded-xl overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={eventTitle}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Détails du billet */}
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="text-zinc-900 text-lg font-bold font-['Olympic_Sans_Bold'] leading-6">
          {eventTitle}
        </h3>
        <p className="text-stone-500 text-sm font-medium font-['Olympic_Sans_Medium']">
          {dateLabel} . {ticketType}
        </p>
        <p className="text-stone-400 text-sm font-normal">
          {seatInfo}
        </p>
        <span className="mt-2 text-xs font-bold tracking-wider text-zinc-900 uppercase">
          PRIX {unitPrice?.toLocaleString("fr-FR")} FCFA
        </span>
      </div>
    </article>
  );
}

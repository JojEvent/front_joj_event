import React from "react";

/**
 * Composant d'affichage des messages de félicitations et détails de l'achat (colonne gauche).
 * Principe de Responsabilité Unique : Afficher le récapitulatif textuel de la commande confirmée.
 */
export default function SuccessMessage({
  eventTitle = "Football : Senegal - Brasil",
  quantity = 2,
  totalAmount = 80000,
}) {
  return (
    <section className="w-full flex flex-col gap-8 text-neutral-900">
      {/* Message de félicitations */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl lg:text-3xl font-bold font-['Olympic_Headline'] text-zinc-900">
          Félicitations !
        </h2>
        <p className="text-stone-600 text-base font-medium">
          Vous avez acheté avec succès le billet pour :
        </p>
        <p className="text-zinc-900 text-lg font-bold mt-1">
          {eventTitle}
        </p>
      </div>

      <div className="w-full h-px bg-gray-100" />

      {/* Détails de l'article */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-bold font-['Olympic_Headline'] text-zinc-900 mb-1">
          Détails de l'article
        </h3>

        <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
          <span className="font-bold text-zinc-900">Article :</span>
          <span>{eventTitle}</span>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
          <span className="font-bold text-zinc-900">Quantité :</span>
          <span>{quantity} Billets</span>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
          <span className="font-bold text-zinc-900">Montant :</span>
          <span className="font-bold text-zinc-900">
            {totalAmount.toLocaleString("fr-FR")} FCFA
          </span>
        </div>
      </div>
    </section>
  );
}

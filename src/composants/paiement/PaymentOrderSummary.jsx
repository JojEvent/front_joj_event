import React from "react";
import PaymentItemCard from "./PaymentItemCard";

/**
 * Composant de récapitulatif de la commande (colonne gauche).
 * Principe de Responsabilité Unique : Afficher la liste des articles et les totaux.
 */
export default function PaymentOrderSummary({ items = [] }) {
  // Calculs financiers
  const totalSubtotal = items.reduce(
    (acc, item) => acc + (item.unitPrice || 0) * (item.quantity || 1),
    0
  );
  const totalTtc = items.reduce(
    (acc, item) => acc + (item.ttc || 0) * (item.quantity || 1),
    0
  );
  const totalAmount = totalSubtotal + totalTtc;
  const itemCount = items.length;

  return (
    <section className="w-full flex flex-col gap-6">
      {/* Liste des articles */}
      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <PaymentItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Lignes de décomposition financières */}
      <div className="flex flex-col gap-3 pt-2 text-sm font-medium text-stone-600">
        <div className="flex justify-between items-center">
          <span>Sous-total</span>
          <span className="font-bold text-zinc-900">
            {totalSubtotal.toLocaleString("fr-FR")} FCFA .x{itemCount}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span>TTC</span>
          <span className="font-bold text-zinc-900">
            {totalTtc.toLocaleString("fr-FR")} FCFA .x{itemCount}
          </span>
        </div>
      </div>

      {/* Total Général */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <span className="text-zinc-900 text-lg font-bold">
          Total FCFA ({itemCount} {itemCount > 1 ? "articles" : "article"})
        </span>
        <span className="text-zinc-900 text-2xl font-extrabold font-['Olympic_Headline']">
          {totalAmount.toLocaleString("fr-FR")} FCFA
        </span>
      </div>
    </section>
  );
}

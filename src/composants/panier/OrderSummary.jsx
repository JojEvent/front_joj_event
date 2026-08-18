// components/domain/panier/OrderSummary.jsx
import React from "react";

function formatFcfa(amount) {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

/**
 * Résumé de commande : sous-total, TTC, total, et bouton de paiement.
 * @param {object[]} items - cartItemsMock
 * @param {() => void} onPay
 */
export default function OrderSummary({ items, onPay }) {
  const eventTitle = items[0]?.eventTitle ?? "";
  const totalQuantity = items.reduce((sum, it) => sum + it.quantity, 0);
  const subtotal = items.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
  const totalTtc = items.reduce((sum, it) => sum + it.ttc * it.quantity, 0);
  const total = subtotal + totalTtc;

  return (
    <div className="w-full flex flex-col justify-start items-start gap-12">
      <div className="w-full flex flex-col justify-start items-start gap-8">
        <p className="text-neutral-800 text-2xl font-bold font-['Inter']">
          Résumé de la commande
        </p>

        <div className="w-full flex flex-col justify-start items-start gap-8">
          <div className="w-full flex flex-col justify-start items-start gap-9">
            <div className="w-full flex flex-col justify-start items-start gap-7">
              <p className="text-neutral-800 text-xl font-bold font-['Olympic_Sans_Bold']">
                {eventTitle}
              </p>

              <div className="w-full flex flex-col justify-start items-start gap-4">
                <div className="w-full flex justify-between items-center">
                  <span className="text-gray-800 text-xl font-normal font-['Inter']">
                    Sous-total
                  </span>
                  <span className="text-neutral-800 text-xl font-medium font-['Inter']">
                    {formatFcfa(items[0]?.unitPrice ?? 0)} .x{totalQuantity}
                  </span>
                </div>
                <div className="w-full flex justify-between items-center">
                  <span className="text-gray-800 text-xl font-normal font-['Olympic_Sans']">
                    TTC
                  </span>
                  <span className="text-neutral-800 text-xl font-medium font-['Inter']">
                    {formatFcfa(items[0]?.ttc ?? 0)} .x{totalQuantity}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full h-0.5 bg-neutral-200 rounded-[1px]" />
          </div>

          <div className="w-full flex justify-between items-center">
            <span className="text-neutral-800 text-xl font-bold font-['Inter']">
              Total FCFA ({totalQuantity} article{totalQuantity > 1 ? "s" : ""})
            </span>
            <span className="text-neutral-800 text-xl font-medium font-['Inter']">
              {formatFcfa(total)}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onPay}
        className="w-96 h-14 px-6 py-2 bg-sky-600 rounded-2xl flex justify-center items-center gap-1 text-white text-2xl font-bold font-['Olympic_Sans_Bold']"
      >
        payer maintenant
      </button>
    </div>
  );
}
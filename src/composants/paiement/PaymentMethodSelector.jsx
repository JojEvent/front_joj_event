import React from "react";

/**
 * Composant de sélection du moyen de paiement.
 * Principe de Responsabilité Unique : Gérer le choix du mode de règlement.
 */
export default function PaymentMethodSelector({ selectedMethod, onSelectMethod }) {
  const paymentMethods = [
    {
      id: "card",
      label: "Carte de Credit",
      icon: (
        <div className="flex items-center -space-x-1.5">
          <div className="w-4 h-4 rounded-full bg-red-600" />
          <div className="w-4 h-4 rounded-full bg-amber-500 opacity-90" />
        </div>
      ),
    },
    {
      id: "wave",
      label: "wave",
      icon: (
        <div className="w-6 h-6 rounded-full bg-sky-400 flex justify-center items-center text-white text-[10px] font-extrabold">
          🐧
        </div>
      ),
    },
    {
      id: "orange_money",
      label: "Orange Money",
      icon: (
        <div className="w-6 h-6 rounded bg-black flex justify-center items-center text-orange-500 font-extrabold text-xs">
          ↗
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-zinc-900 text-lg font-bold font-['Olympic_Sans_Bold']">
        Détails du paiement
      </h3>

      <div className="flex flex-wrap items-center gap-6 py-2">
        {paymentMethods.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <label
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              {method.icon}
              <span className="text-sm font-semibold text-zinc-900">
                {method.label}
              </span>
              <input
                type="radio"
                name="payment_method"
                checked={isSelected}
                onChange={() => onSelectMethod(method.id)}
                className="w-4 h-4 text-sky-600 focus:ring-sky-500 border-gray-300 ml-1 cursor-pointer"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}

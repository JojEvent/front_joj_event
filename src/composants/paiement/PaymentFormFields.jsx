import React, { useState } from "react";

/**
 * Composant de formulaire de saisie des informations de carte et validation du paiement.
 * Principe de Responsabilité Unique : Gérer la saisie utilisateur et l'action de soumission du paiement.
 */
export default function PaymentFormFields({ totalAmount = 80000, onSubmitPayment }) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardHolderName: "",
    promoCode: "",
    acceptTerms: true,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmitPayment) {
      onSubmitPayment(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      {/* Numéro de carte */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-stone-700">
          Numéro de carte
        </label>
        <input
          type="text"
          placeholder="xxxx xxxx xxxx xxxx"
          value={formData.cardNumber}
          onChange={(e) => handleChange("cardNumber", e.target.value)}
          className="w-full h-11 px-4 rounded-xl border border-stone-300 text-sm font-medium focus:outline-none focus:border-sky-600 transition-colors"
        />
      </div>

      {/* Expiration + CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-stone-700">
            Date d'expiration
          </label>
          <input
            type="text"
            placeholder="MM/YY"
            value={formData.expirationDate}
            onChange={(e) => handleChange("expirationDate", e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-stone-300 text-sm font-medium focus:outline-none focus:border-sky-600 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-stone-700">
            CVV
          </label>
          <input
            type="password"
            maxLength={4}
            placeholder="XXX"
            value={formData.cvv}
            onChange={(e) => handleChange("cvv", e.target.value)}
            className="w-full h-11 px-4 rounded-xl border border-stone-300 text-sm font-medium focus:outline-none focus:border-sky-600 transition-colors"
          />
        </div>
      </div>

      {/* Nom sur la carte */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-stone-700">
          Nom sur la carte
        </label>
        <input
          type="text"
          placeholder="Entrez votre nom"
          value={formData.cardHolderName}
          onChange={(e) => handleChange("cardHolderName", e.target.value)}
          className="w-full h-11 px-4 rounded-xl border border-stone-300 text-sm font-medium focus:outline-none focus:border-sky-600 transition-colors"
        />
      </div>

      {/* Code de réduction */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-stone-700">
          Code de réduction
        </label>
        <input
          type="text"
          placeholder="Entrez le code de réduction"
          value={formData.promoCode}
          onChange={(e) => handleChange("promoCode", e.target.value)}
          className="w-full h-11 px-4 rounded-xl border border-stone-300 text-sm font-medium focus:outline-none focus:border-sky-600 transition-colors"
        />
      </div>

      {/* Case à cocher Conditions / Confidentialité */}
      <div className="flex items-start gap-3 pt-2">
        <input
          type="checkbox"
          id="acceptTerms"
          checked={formData.acceptTerms}
          onChange={(e) => handleChange("acceptTerms", e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-stone-300 cursor-pointer"
        />
        <label htmlFor="acceptTerms" className="text-xs font-medium text-stone-700 leading-snug cursor-pointer">
          En cliquant ici, j'accepte la Politique de confidentialité de Ticketer
        </label>
      </div>

      {/* Bouton de confirmation du paiement */}
      <button
        type="submit"
        disabled={!formData.acceptTerms}
        className="w-full h-12 mt-2 bg-sky-600 hover:bg-sky-700 disabled:bg-gray-300 text-white font-bold text-base rounded-xl shadow transition-colors cursor-pointer"
      >
        Payer {totalAmount.toLocaleString("fr-FR")} FCFA
      </button>
    </form>
  );
}

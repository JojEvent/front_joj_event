import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../composants/header";
import Footer from "../composants/footer";
import CartStepper from "../composants/panier/CartStepper";
import CartTimer from "../composants/panier/CartTimer";
import PaymentOrderSummary from "../composants/paiement/PaymentOrderSummary";
import PaymentMethodSelector from "../composants/paiement/PaymentMethodSelector";
import PaymentFormFields from "../composants/paiement/PaymentFormFields";
import {
  stepsMock,
  reservationTimeLimitMock,
  cartItemsMock,
} from "../../mocks/panierMock";
import { toast } from "react-toastify";

/**
 * Page "Paiement" du tunnel de réservation JOJ Dakar 2026 (Étape 3).
 * Respecte le principe de responsabilité unique en assemblant les composants métier isolés.
 */
export default function PaiementPage() {
  const navigate = useNavigate();
  const [items] = useState(cartItemsMock);
  const [selectedMethod, setSelectedMethod] = useState("card");

  // Calcul du montant total
  const totalSubtotal = items.reduce(
    (acc, item) => acc + (item.unitPrice || 0) * (item.quantity || 1),
    0
  );
  const totalTtc = items.reduce(
    (acc, item) => acc + (item.ttc || 0) * (item.quantity || 1),
    0
  );
  const totalAmount = totalSubtotal + totalTtc;

  const handleTimerExpire = () => {
    toast.error("Le temps de réservation a expiré !");
    navigate("/panier");
  };

  const handlePaymentSubmit = (paymentData) => {
    console.log("Paiement effectué :", {
      method: selectedMethod,
      paymentData,
      totalAmount,
    });
    toast.success("Paiement réussi ! Génération de vos billets...");
    // Redirection vers l'étape 4 ou de confirmation
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-between font-olympic">
      <Header />

      <main className="w-full flex-1 flex flex-col items-center gap-8 py-6">
        {/* Étape 3 du tunnel de réservation */}
        <CartStepper steps={stepsMock} currentStep={3} />

        {/* Bannière de temporisation & sous-titre */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-zinc-900 text-xl font-bold font-['Olympic_Headline'] tracking-wide">
            PAIEMENT
          </h2>
          <p className="text-stone-500 text-sm font-medium">
            Vous avez 15 min pour valider vos réservation
          </p>
          <CartTimer
            initialSeconds={reservationTimeLimitMock}
            onExpire={handleTimerExpire}
          />
        </div>

        {/* Zone de contenu à deux colonnes */}
        <section className="w-full max-w-[1232px] px-4 flex flex-col gap-8 mt-4">
          {/* Titre de section principal */}
          <h1 className="text-neutral-900 text-4xl lg:text-5xl font-bold font-['Olympic_Headline'] tracking-tight">
            PAIEMENT
          </h1>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Colonne Gauche : Récapitulatif des billets & totaux */}
            <PaymentOrderSummary items={items} />

            {/* Colonne Droite : Choix du paiement & Formulaire */}
            <div className="w-full flex flex-col gap-6 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <PaymentMethodSelector
                selectedMethod={selectedMethod}
                onSelectMethod={setSelectedMethod}
              />
              <PaymentFormFields
                totalAmount={totalAmount}
                onSubmitPayment={handlePaymentSubmit}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

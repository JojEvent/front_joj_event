import React from "react";
import Header from "../composants/header";
import Footer from "../composants/footer";
import CartStepper from "../composants/panier/CartStepper";
import SuccessMessage from "../composants/succes/SuccessMessage";
import TicketDigitalCard from "../composants/succes/TicketDigitalCard";
import TicketActions from "../composants/succes/TicketActions";
import { stepsMock } from "../../mocks/panierMock";

/**
 * Page "Succès / Obtenir Billet" du tunnel de réservation JOJ Dakar 2026 (Étape 4).
 * Respecte le principe de responsabilité unique en assemblant les composants métier de confirmation.
 */
export default function SuccesPage() {
  const purchaseData = {
    eventTitle: "Football : Senegal - Brasil",
    quantity: 2,
    totalAmount: 80000,
    section: "VIP",
    seats: "23, 24",
    date: "4 Juin",
    time: "20h",
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-between font-olympic">
      <Header />

      <main className="w-full flex-1 flex flex-col items-center gap-8 py-6">
        {/* Étape 4 du tunnel de réservation */}
        <CartStepper steps={stepsMock} currentStep={4} />

        {/* Bannière de titre de succès */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-emerald-600 text-3xl lg:text-4xl font-bold font-['Olympic_Headline'] tracking-tight">
            Paiement réussi !
          </h1>
          <p className="text-stone-500 text-sm font-medium">
            Tu a validé tes billets
          </p>
        </div>

        {/* Zone de contenu à deux colonnes */}
        <section className="w-full max-w-[1100px] px-4 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 mt-4">
          {/* Colonne Gauche : Félicitations & Détails de l'article */}
          <div className="w-full lg:flex-1">
            <SuccessMessage
              eventTitle={purchaseData.eventTitle}
              quantity={purchaseData.quantity}
              totalAmount={purchaseData.totalAmount}
            />
          </div>

          {/* Colonne Droite : Billet Numérique & Boutons d'action */}
          <div className="w-full lg:w-auto flex flex-col items-center gap-6">
            <TicketDigitalCard
              eventTitle={purchaseData.eventTitle}
              quantity={purchaseData.quantity}
              section={purchaseData.section}
              seats={purchaseData.seats}
              date={purchaseData.date}
              time={purchaseData.time}
            />
            <TicketActions />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

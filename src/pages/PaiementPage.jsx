import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../composants/header";
import Footer from "../composants/footer";
import CartStepper from "../composants/panier/CartStepper";
import CartTimer from "../composants/panier/CartTimer";
import PaymentOrderSummary from "../composants/paiement/PaymentOrderSummary";
import PaymentMethodSelector from "../composants/paiement/PaymentMethodSelector";
import PaymentFormFields from "../composants/paiement/PaymentFormFields";
import { stepsMock, reservationTimeLimitMock } from "../../mocks/panierMock";
import { useCart } from "../context/CartContext";
import { instance } from "../services/api";
import { toast } from "react-toastify";

/**
 * Page "Paiement" du tunnel de réservation JOJ Dakar 2026 (Étape 3).
 * Intègre PayDunya avec l'API Backend Django tout en conservant la structure d'origine.
 */
export default function PaiementPage() {
  const navigate = useNavigate();

  // Utiliser les articles réels du panier et la fonction de vidage
  const { items, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [enChargement, setEnChargement] = useState(false);

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

  /**
   * Soumission du paiement :
   * Appelle l'endpoint PayDunya du backend Django pour créer la facture et rediriger vers la passerelle.
   */
  const handlePaymentSubmit = async () => {
    if (!items || items.length === 0) {
      toast.error("Votre panier est vide !");
      navigate("/panier");
      return;
    }

    setEnChargement(true);
    toast.info("Initialisation du paiement sécurisé PayDunya...");

    try {
      // 1. Appeler l'action ModelViewSet PayDunya sur l'API Django
      const response = await instance.post("billets/paydunya-payer/", {
        items: items,
      });

      // 2. Vider le panier après l'initialisation réussie de la facture
      clearCart();

      // 3. Rediriger l'utilisateur vers la passerelle sécurisée PayDunya
      if (response.data && response.data.url_paiement) {
        window.location.href = response.data.url_paiement;
      } else {
        toast.error("Lien de paiement non reçu. Veuillez réessayer.");
        setEnChargement(false);
      }
    } catch (error) {
      console.error("Erreur lors de la demande PayDunya:", error);
      const messageErreur = error.response?.data?.erreur || "Impossible de contacter le service de paiement PayDunya.";
      toast.error(messageErreur);
      setEnChargement(false);
    }
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

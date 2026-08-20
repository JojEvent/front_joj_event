import React, { useEffect, useState } from "react";
import Header from "../composants/header";
import Footer from "../composants/footer";
import CartStepper from "../composants/panier/CartStepper";
import SuccessMessage from "../composants/succes/SuccessMessage";
import TicketDigitalCard from "../composants/succes/TicketDigitalCard";
import TicketActions from "../composants/succes/TicketActions";
import { stepsMock } from "../../mocks/panierMock";
import { instance } from "../services/api";
import { toast } from "react-toastify";
import "../styles/printTicket.css";

/**
 * Page "Succès / Obtenir Billet" du tunnel de réservation JOJ Dakar 2026 (Étape 4).
 * Redirigée automatiquement par PayDunya après la validation du paiement.
 */
export default function SuccesPage() {
  const [billet, setBillet] = useState(null);
  const [chargement, setChargement] = useState(true);

  // Récupérer le dernier billet généré et ses détails d'événement
  useEffect(() => {
    async function chargerBilletPaye() {
      try {
        const response = await instance.get("billets/");
        const listeBillets = Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];

        if (listeBillets.length > 0) {
          const dernierBillet = listeBillets[listeBillets.length - 1];
          setBillet(dernierBillet);

          // Si l'événement est un ID, charger les détails réels de l'événement
          if (dernierBillet.evenement && typeof dernierBillet.evenement !== "object") {
            try {
              const resEvent = await instance.get(`evenements/${dernierBillet.evenement}/`);
              if (resEvent.data) {
                setBillet((prev) => ({
                  ...prev,
                  evenement_detail: resEvent.data,
                }));
              }
            } catch (errEvent) {
              console.error("Erreur chargement événement:", errEvent);
            }
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des billets:", error);
      } finally {
        setChargement(false);
      }
    }
    chargerBilletPaye();
  }, []);

  // Télécharger ou Imprimer SEULEMENT la carte du billet
  const handleDownload = () => {
    toast.info("Impression / Téléchargement du billet en cours...");
    window.print();
  };

  // Partager le billet
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Mon Billet JOJ Dakar 2026",
        text: "Voici mon billet officiel pour les Jeux Olympiques de la Jeunesse !",
        url: window.location.href,
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien de votre billet copié !");
    }
  };

  // Titre dynamique réel de l'événement (fallback propre en cas d'absence)
  const titreEvenement =
    billet?.evenement_detail?.titre ||
    billet?.evenement_detail?.title ||
    billet?.evenement_nom ||
    "Événement JOJ Dakar 2026";

  const heureAchat = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const purchaseData = {
    eventTitle: titreEvenement,
    quantity: billet?.quantite || billet?.quantity || 1,
    totalAmount: billet?.prix ? Number(billet.prix) : 5000,
    section: billet?.type_billet || "STANDARD",
    seats: billet?.siege || "Place réservée",
    date: billet?.evenement_detail?.date_debut || billet?.evenement_detail?.date || "JOJ 2026",
    time: heureAchat,
    image: billet?.evenement_detail?.image_principale || billet?.evenement_detail?.image,
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
            Votre paiement a été validé par PayDunya. Voici votre billet officiel.
          </p>
        </div>

        {/* Zone de contenu à deux colonnes */}
        <section className="w-full max-w-[1100px] px-4 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 mt-4">
          {/* Colonne Gauche : Félicitations & Détails */}
          <div className="w-full lg:flex-1">
            <SuccessMessage
              eventTitle={purchaseData.eventTitle}
              quantity={purchaseData.quantity}
              totalAmount={purchaseData.totalAmount}
            />
          </div>

          {/* Colonne Droite : Billet Numérique & Boutons de téléchargement */}
          <div className="w-full lg:w-auto flex flex-col items-center gap-6">
            <TicketDigitalCard
              eventTitle={purchaseData.eventTitle}
              quantity={purchaseData.quantity}
              section={purchaseData.section}
              seats={purchaseData.seats}
              date={purchaseData.date}
              time={purchaseData.time}
              image={purchaseData.image}
              qrCodeUrl={billet?.qr_code}
            />
            <TicketActions onDownload={handleDownload} onShare={handleShare} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

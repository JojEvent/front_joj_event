// pages/CartPage.jsx
import React, { useState } from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import CartStepper from "../components/domain/panier/CartStepper";
import CartTimer from "../components/domain/panier/CartTimer";
import CartItemCard from "../components/domain/panier/CartItemCard";
import OrderSummary from "../components/domain/panier/OrderSummary";
import {
  stepsMock,
  currentStepMock,
  reservationTimeLimitMock,
  cartItemsMock,
} from "../mocks/panierMock";

/**
 * Page "Mon Panier" du tunnel de réservation JOJ Dakar 2026.
 *
 * TODO intégration backend_joj_event :
 * - remplacer cartItemsMock par un fetch (ex: hook useCart() -> GET /api/panier/)
 * - onDelete -> DELETE /api/panier/items/{id}/
 * - onPay -> POST /api/reservations/{id}/paiement/ puis redirection étape 3
 */
export default function CartPage() {
  const [items, setItems] = useState(cartItemsMock);

  const handleEdit = (id) => {
    // TODO: ouvrir la modale de modification de siège / type de billet
    console.log("Modifier l'article :", id);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleExpire = () => {
    // TODO: libérer la réservation côté backend + rediriger vers l'étape 1
    console.log("Temps de réservation expiré");
  };

  const handlePay = () => {
    // TODO: déclencher le paiement (étape 3)
    console.log("Paiement lancé pour", items.length, "article(s)");
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center gap-14 pt-8">
      <Navbar />

      <CartStepper steps={stepsMock} currentStep={currentStepMock} />

      <CartTimer initialSeconds={reservationTimeLimitMock} onExpire={handleExpire} />

      <section className="w-full max-w-[1232px] flex flex-col items-center gap-14 px-4">
        <h1 className="self-stretch text-neutral-800 text-5xl font-bold font-['Olympic_Headline']">
          Réservation en cours
        </h1>

        {items.length === 0 ? (
          <p className="self-stretch text-neutral-600 text-base font-['Inter']">
            Votre panier est vide.
          </p>
        ) : (
          <div className="self-stretch flex flex-col gap-10">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
            <div className="self-stretch h-0.5 bg-neutral-200 rounded-[1px]" />
          </div>
        )}
      </section>

      {items.length > 0 && (
        <section className="w-full max-w-[1232px] px-4">
          <OrderSummary items={items} onPay={handlePay} />
        </section>
      )}

      <Footer />
    </div>
  );
}
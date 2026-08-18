// pages/CartPage.jsx
import React, { useState } from "react";
import Header from "../composants/header";
import Footer from "../composants/footer";
import CartStepper from "../composants/panier/CartStepper";
import CartTimer from "../composants/panier/CartTimer";
import CartItemCard from "../composants/panier/CartItemCard";
import OrderSummary from "../composants/panier/OrderSummary";
import {
  stepsMock,
  currentStepMock,
  reservationTimeLimitMock,
  cartItemsMock,
} from "../../mocks/panierMock";

export default function CartPage() {
  const [items, setItems] = useState(cartItemsMock);

  const handleEdit = (id) => {
    console.log("Modifier l'article :", id);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleExpire = () => {
    console.log("Temps de réservation expiré");
  };

  const handlePay = () => {
    console.log("Paiement lancé pour", items.length, "article(s)");
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center gap-14 pt-8">
      <Header />

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
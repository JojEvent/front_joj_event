import CartStepper from "../composants/panier/CartStepper";
import CartTimer from "../composants/panier/CartTimer";
import CartItemCard from "../composants/panier/CartItemCard";
import OrderSummary from "../composants/panier/OrderSummary";
import {
  stepsMock,
  currentStepMock,
  reservationTimeLimitMock,
} from "../../mocks/panierMock";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

/**
 * Page "Mon Panier" du tunnel de réservation JOJ Dakar 2026.
 * Les articles viennent du CartContext (alimenté par TicketCard).
 */
export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeFromCart } = useCart();

  const handleEdit = (id) => {
    // TODO: ouvrir la modale de modification de siège / type de billet
    console.log("Modifier l'article :", id);
  };

  const handleDelete = (id) => {
    removeFromCart(id);
  };

  const handleExpire = () => {
    // TODO: libérer la réservation côté backend + rediriger vers l'étape 1
    console.log("Temps de réservation expiré");
  };

  const handlePay = () => {
    navigate("/paiement");
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center gap-14 pt-8">

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

    </div>
  );
}
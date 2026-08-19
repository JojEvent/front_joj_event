import { Users } from "lucide-react";
import TicketTypeSelector from "./TicketTypeSelector";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";


export default function TicketCard({ event }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [typeSelectionne, setTypeSelectionne] = useState(null);

  const typesBillets = ["STANDARD", "VIP"];

  useEffect(() => {
    if (!typeSelectionne) {
      setTypeSelectionne("STANDARD");
    }
  }, [typeSelectionne]);

  // Calcul du prix selon le type sélectionné
  const prixEvenement = Number(event?.prix || 2500);
  const prixMinimum = typeSelectionne === "VIP" ? prixEvenement * 2 : prixEvenement;

  // Gestion de l'achat de billet
  const handleAcheterBillet = () => {
    // Si l'utilisateur n'est pas connecté, redirection vers login
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }
    
    // Ajout d'une offre au panier pour l'événement et le type choisi
    const billetAchete = {
      id: event?.id || 1,
      type_billet: typeSelectionne,
      prix: prixMinimum,
    };

    addToCart(event, [billetAchete]);
  };

  return (
    <div className="w-96 p-8 bg-white rounded-[32px] shadow-2xl outline outline-2 outline-offset-[-2px] outline-gray-100 flex flex-col gap-6">

      {/* PRIX */}
      <div className="self-stretch flex justify-between items-center">
        <div className="flex flex-col gap-1">

          <span className="text-stone-500 text-sm font-bold uppercase">
            Prix
          </span>

          <div className="flex items-baseline gap-1">
            <span className="text-zinc-900 text-4xl font-bold">
              {prixMinimum}
            </span>

            <span className="text-zinc-900 text-xl font-bold">
              FCFA
            </span>
          </div>

        </div>

        <span className="px-4 py-2 bg-red-600/10 rounded-xl text-red-600 text-sm font-bold">
          Vente rapide
        </span>
      </div>

      {/* DISPONIBILITÉ */}
      <div className="self-stretch p-4 rounded-2xl outline outline-1 outline-gray-100 flex items-center gap-4">

        <Users
          className="size-8 text-Icon-Default-Default"
          strokeWidth={2}
        />

        <div className="flex-1 flex flex-col">

          <span className="text-stone-500 text-xs font-bold uppercase">
            Disponibilité
          </span>

          <span className="text-zinc-900 text-base font-bold">
            Billets disponibles
          </span>

        </div>

        <span className="size-2 bg-green-700 rounded-full" />
      </div>

      {/* SÉLECTION DU TYPE */}
      <TicketTypeSelector
        types={typesBillets}
        selectedType={typeSelectionne}
        onChange={setTypeSelectionne}
      />

      {/* AJOUT AU PANIER / ACHATER UN BILLET */}
      <button
        type="button"
        onClick={handleAcheterBillet}
        className="self-stretch py-5 bg-blue-600 rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,85,164,0.30)] flex justify-center items-center"
      >
        <span className="text-white text-xl font-bold uppercase cursor-pointer">
          Ajouter au panier
        </span>
      </button>

      <p className="self-stretch text-center text-stone-500 text-xs">
        En achetant un billet, vous acceptez les conditions générales de
        vente et le règlement intérieur de l'arène.
      </p>

    </div>
  );
}
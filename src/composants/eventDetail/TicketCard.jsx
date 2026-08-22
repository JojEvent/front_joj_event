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

  // Vérifications de la date et des places disponibles
  const estPasse = event?.date_fin
    ? new Date(event.date_fin) < new Date()
    : event?.date_debut
    ? new Date(event.date_debut) < new Date()
    : false;

  const placesRestantes = event?.jauge_totale !== undefined ? Number(event.jauge_totale) : 500;
  const estComplet = placesRestantes <= 0;
  const impossibleDacheter = estPasse || estComplet;

  // Calcul du prix selon le type sélectionné
  const prixEvenement = Number(event?.prix || 2500);
  const prixMinimum = typeSelectionne === "VIP" ? prixEvenement * 2 : prixEvenement;

  // Gestion de l'achat de billet
  const handleAcheterBillet = () => {
    if (impossibleDacheter) return;

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
          {estPasse ? "Terminé" : estComplet ? "Épuisé" : "Vente rapide"}
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
            {estPasse
              ? "Événement passé"
              : estComplet
              ? "Événement complet (0 place)"
              : `${placesRestantes} places disponibles`}
          </span>

        </div>

        <span className={`size-3 rounded-full ${impossibleDacheter ? "bg-red-600" : "bg-green-700"}`} />
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
        disabled={impossibleDacheter}
        onClick={handleAcheterBillet}
        className={`self-stretch py-5 rounded-2xl flex justify-center items-center ${
          impossibleDacheter
            ? "bg-gray-300 cursor-not-allowed shadow-none"
            : "bg-blue-600 shadow-[0px_10px_15px_-3px_rgba(0,85,164,0.30)] cursor-pointer"
        }`}
      >
        <span className="text-white text-xl font-bold uppercase">
          {estPasse
            ? "Événement passé"
            : estComplet
            ? "Événement complet"
            : "Ajouter au panier"}
        </span>
      </button>

      <p className="self-stretch text-center text-stone-500 text-xs">
        En achetant un billet, vous acceptez les conditions générales de
        vente et le règlement intérieur de l'arène.
      </p>

    </div>
  );
}
import { Users } from "lucide-react";
import TicketTypeSelector from "./TicketTypeSelector";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";


export default function TicketCard({ event }) {
  const { addToCart } = useCart()
  const [typeSelectionne, setTypeSelectionne] = useState(null);

  const billets = event?.billets ?? [];

  // Billets disponibles uniquement
  const billetsDisponibles = billets.filter(
    (billet) => billet.statut === "VALIDE"
  );

  // Types de billets disponibles
  const typesBillets = [
    //Un Set est une structure JavaScript qui ne garde qu'une seule occurrence de chaque valeur.
    ...new Set(
      billetsDisponibles.map((billet) => billet.type_billet)
    ),
  ];

  // Sélectionner automatiquement le premier type
  // lorsque les billets sont chargés
  useEffect(() => {
    if (typesBillets.length > 0 && !typeSelectionne) {
      setTypeSelectionne(typesBillets[0]);
    }
  }, [typesBillets, typeSelectionne]);

  // Billets correspondant au type sélectionné
  const billetsDuType = billetsDisponibles.filter(
    (billet) => billet.type_billet === typeSelectionne
  );

  // Prix minimum du type sélectionné
  const prixMinimum =
    billetsDuType.length > 0
      ? Math.min(
          ...billetsDuType.map((billet) => Number(billet.prix))
        )
      : 0;

  // Aucun billet disponible → on n'affiche pas la carte
  if (billetsDisponibles.length === 0) {
    return null;
  }

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

        {billetsDuType.length > 0 && (
          <span className="px-4 py-2 bg-red-600/10 rounded-xl text-red-600 text-sm font-bold">
            Vente rapide
          </span>
        )}
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
            Il reste {billetsDuType.length} billet
            {billetsDuType.length > 1 ? "s" : ""}.
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

      {/* AJOUT AU PANIER */}
      <button
        type="button"
        onClick={() => addToCart(event, billetsDuType)}
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
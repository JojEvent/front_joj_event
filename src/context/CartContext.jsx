import { createContext, useCallback, useContext, useState, useEffect } from "react";
import { formatEventDate } from "../utils/formatDate";
import { useAuth } from "./authContext";

const CartContext = createContext(null);

/**
 * Fournisseur global du panier. À placer une seule fois,
 * au-dessus des routes (dans App.jsx ou le layout principal),
 * pour que TicketCard (page événement) et CartPage (page panier)
 * partagent le même état.
 */
export function CartProvider({ children }) {
  const { user } = useAuth();
  const cartKey = user ? `cart_user_${user.id}` : null;
  
  //l'état du panier
  const [items, setItems] = useState([]);

  // Charger le panier de l'utilisateur connecté
 useEffect(() => {
    if (!cartKey) {
      setItems([]);
      return;
    }

    const panierSauvegarde = localStorage.getItem(cartKey);

    setItems(
      panierSauvegarde
        ? JSON.parse(panierSauvegarde)
        : []
    );
  }, [cartKey]);

    
// Sauvegarder le panier
  useEffect(() => {
    if (!cartKey) return;

    localStorage.setItem(
      cartKey,
      JSON.stringify(items)
    );
  }, [items, cartKey]);

  /**
   * Ajoute des billets au panier.
   * Si le type de billet pour cet événement existe déjà dans le panier, augmente sa quantité.
   */
  const addToCart = useCallback((event, billetSelectionnes) => {
    setItems((prev) => {
      const copy = [...prev];
      const eventId = event?.id;
      const typeBillet = billetSelectionnes[0]?.type_billet || "Standard";

      // Chercher si un article pour le même événement et même type de billet existe déjà
      const existingIndex = copy.findIndex(
        (item) => item.eventId === eventId && item.ticketType === typeBillet
      );

      if (existingIndex > -1) {
        // Si présent, on incrémente sa quantité de 1
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + 1,
        };
        return copy;
      } else {
        // Sinon, on l'ajoute au panier
        const premierBillet = billetSelectionnes[0] || {};
        const newItem = {
          id: `cart-${eventId}-${typeBillet}-${Date.now()}`,
          billetId: premierBillet.id,
          eventId: eventId,
          eventTitle: event?.titre ?? event?.nom ?? "",
          dateLabel: formatEventDate(event?.date_debut),
          ticketType: typeBillet,
          seatInfo:
            premierBillet.section || premierBillet.rangee || premierBillet.siege
              ? `Section ${premierBillet.section ?? "-"}, Rangée ${premierBillet.rangee ?? "-"}, Siège ${premierBillet.siege ?? "-"}`
              : "Place non numérotée",
          unitPrice: Number(premierBillet.prix || 0),
          ttc: Number(premierBillet.ttc ?? 0),
          quantity: 1,
          image: event?.image ?? event?.image_principale ?? "https://placehold.co/170x160",
        };
        return [...copy, newItem];
      }
    });
  }, []);

  //Supprimer un billet
  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  //Vider complètement le panier
  const clearCart = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart() doit être appelé à l'intérieur d'un <CartProvider>");
  }
  return context;
}
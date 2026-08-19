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
   * @param {object} event - l'événement affiché (contient titre, date, image...)
   * @param {object[]} billetsSelectionnes - billets à ajouter (ex: billetsDuType)
   */
  const addToCart = useCallback((event, billetSelectionnes) => {
    setItems((prev) => {
        //retourner les id des billets présents
      const idsExistants = new Set(prev.map((item) => item.billetId));

      const nouveauxArticles = billetSelectionnes
      //Filtrer les nouveaux billets
        .filter((billet) => !idsExistants.has(billet.id))
        .map((billet) => ({
          id: `billet-${billet.id}`,
          billetId: billet.id,
          eventId: event?.id,
          eventTitle: event?.titre ?? event?.nom ?? "",
          dateLabel: formatEventDate(event?.date_debut),
          ticketType: billet.type_billet,
          seatInfo:
            billet.section || billet.rangee || billet.siege
              ? `Section ${billet.section ?? "-"}, Rangée ${billet.rangee ?? "-"}, Siège ${billet.siege ?? "-"}`
              : "Place non numérotée",
          unitPrice: Number(billet.prix),
          ttc: Number(billet.ttc ?? 0),
          quantity: 1,
          image: event?.image_principale ?? "https://placehold.co/170x160",
        }));

      return [...prev, ...nouveauxArticles];
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
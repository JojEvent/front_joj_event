// mocks/panierMock.js
// Données mockées pour la page "Mon Panier" (front_joj_event)
// À remplacer plus tard par les données réelles venant de backend_joj_event
// (endpoint attendu, ex: GET /api/panier/ )

export const stepsMock = [
  { id: 1, label: "Choisir Événement" },
  { id: 2, label: "Mon panier" },
  { id: 3, label: "Paiement" },
  { id: 4, label: "Obtenir Billet" },
];

// Étape actuelle du tunnel de réservation (index basé sur "id" ci-dessus)
export const currentStepMock = 2;

// Durée du timer de réservation, en secondes (15 min)
export const reservationTimeLimitMock = 15 * 60;

// Articles présents dans le panier
export const cartItemsMock = [
  {
    id: "item-1",
    eventTitle: "Football : Senegal - Bresil",
    dateLabel: "04 Juin, Lun. 20h00",
    ticketType: "Billet VIP",
    seatInfo: "Section 1, Rangée D, Siège 105",
    unitPrice: 39000,
    ttc: 1000,
    quantity: 1,
    image: "https://placehold.co/170x160",
  },
  {
    id: "item-2",
    eventTitle: "Football : Senegal - Bresil",
    dateLabel: "04 Juin, Lun. 20h00",
    ticketType: "Billet VIP",
    seatInfo: "Section 1, Rangée D, Siège 106",
    unitPrice: 39000,
    ttc: 1000,
    quantity: 1,
    image: "https://placehold.co/170x160",
  },
];
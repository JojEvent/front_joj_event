// utils/eventsAdapter.js
// Adapte la sortie de EvenementListSerializer (GET /api/evenements/)
// vers les props attendues par EventCard.
import { formatEventDate } from "./formatDate";

// Pour savoir quelle couleur utiliser pour le badge de chaque discipline ?
const SPORT_COLORS = {
  Natation: "bg-sky-700",
  Athlétisme: "bg-red-600",
  "Basket-ball 3x3": "bg-yellow-600",
  Gymnastique: "bg-Primaire",
  Escrime: "bg-stone-500",
  Judo: "bg-sky-700",
};

// récupère la couleur correspondant au sport
function getSportColor(sportName) {
  return SPORT_COLORS[sportName] ?? "bg-zinc-900";
}

export function mapEventFromApi(event) {
  // Récupérer le nom du sport
  const sportName = event.discipline?.nom ?? "Sport";
// format attendu par le frontend.
  return {
    id: event.id,
    title: event.titre,
    date: formatEventDate(event.date_debut),
    location: event.infrastructure.nom ?? "Lieu à confirmer",
    discipline: event.discipline.nom ?? "pas de discipline",
    tags: [{ label: sportName.toUpperCase(), color: getSportColor(sportName) }],

    // ⚠️ Aucune image dans EvenementListSerializer : il faudra soit ajouter
    // un champ (ex. `image_principale` via SerializerMethodField côté DRF,
    // qui renvoie l'image du EvenementMedia où est_principal=True), soit
    // faire un 2e appel par événement (déconseillé en perf).
    image: event.image_principale,

    // ⚠️ Aucun champ prix dans le modèle Evenement.
    price: "Prix à venir",

    // ⚠️ Aucun champ favori dans EvenementListSerializer.
    isFavorite: event.est_favori,

    date_debut: formatEventDate(event.created_at),

  };
}

export function mapEventsFromApi(rawEvents) {
  return rawEvents.map(mapEventFromApi);
}
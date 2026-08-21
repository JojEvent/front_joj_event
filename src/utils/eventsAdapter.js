// utils/eventsAdapter.js
// Adapte la sortie de EvenementListSerializer (GET /api/evenements/)
// vers les props attendues par EventCard.
import { formatEventDate, formatSimpleDate } from "./formatDate";
import defaultEventImage from "../assets/basket.png";

const SPORT_COLORS = {
  Natation: "bg-sky-700",
  Athlétisme: "bg-red-600",
  "Basket-ball 3x3": "bg-yellow-600",
  "Basketball 3x3": "bg-yellow-600",
  Gymnastique: "bg-emerald-600",
  Escrime: "bg-stone-500",
  Judo: "bg-sky-700",
  Futsal: "bg-blue-600",
  Futsall: "bg-blue-600",
  Football: "bg-green-600",
  Boxe: "bg-rose-700",
  Taekwondo: "bg-indigo-600",
  Tennis: "bg-amber-600",
};

function getSportColor(sportName) {
  return SPORT_COLORS[sportName] ?? "bg-zinc-900";
}

export function mapEventFromApi(event) {
  if (!event) return null;

  // Récupérer le nom du sport
  const sportName =
    event.discipline?.nom ||
    (typeof event.discipline === "string" ? event.discipline : "Sport");

  // Formatage de l'image (absolue ou relative vers backend)
  let imageUrl =
    event.image_principale ||
    event.image ||
    event.medias?.[0]?.image ||
    event.medias?.find?.((m) => m.est_principal)?.image;

  if (imageUrl && !imageUrl.startsWith("http") && !imageUrl.startsWith("data:") && !imageUrl.startsWith("blob:")) {
    imageUrl = `http://127.0.0.1:8000${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
  }

  // Lieu / Infrastructure / Site
  const location =
    event.infrastructure?.nom ||
    (typeof event.infrastructure === "string" ? event.infrastructure : null) ||
    event.site?.nom ||
    (typeof event.site === "string" ? event.site : null) ||
    event.location ||
    "Lieu à confirmer";

  // Tarifs
  const priceText =
    event.prix !== undefined && event.prix !== null && Number(event.prix) > 0
      ? `${Number(event.prix).toLocaleString("fr-FR")} FCFA`
      : event.prix === 0
      ? "Gratuit"
      : "Tarifs à venir";

  return {
    id: event.id,
    title: event.titre || "Événement sans titre",
    date: formatEventDate(event.date_debut),
    date_debut_raw: event.date_debut,
    date_debut: formatSimpleDate(event.date_debut) || formatEventDate(event.date_debut),
    date_fin: event.date_fin,
    location: location,
    discipline: sportName,
    tags: [
      { label: sportName.toUpperCase(), color: getSportColor(sportName) },
      ...(event.categorie
        ? [{ label: event.categorie.toUpperCase(), color: "bg-neutral-800" }]
        : []),
    ],
    image: imageUrl || defaultEventImage,
    price: priceText,
    isFavorite: Boolean(event.est_favori),
    statut: event.statut,
    jauge_totale: event.jauge_totale,
  };
}

export function mapEventsFromApi(rawEvents) {
  if (!Array.isArray(rawEvents)) return [];
  return rawEvents.map(mapEventFromApi).filter(Boolean);
}
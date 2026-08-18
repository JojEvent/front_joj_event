// utils/formatDate.js

// Django renvoie du ISO 8601 (ex: "2026-11-03T16:30:00Z") via DateTimeField.
// On formate en "Lun. 3 novembre, 16h30" comme dans la maquette.

const JOURS_ABBR = ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."];

export function formatEventDate(isoString) {
  if (!isoString) return "";

  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";

  const jour = JOURS_ABBR[date.getDay()];
  const jourMois = date.getDate();
  const mois = date.toLocaleDateString("fr-FR", { month: "long" });
  const heure = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return `${jour} ${jourMois} ${mois}, ${heure}h${minute}`;
}

export function formatSimpleDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
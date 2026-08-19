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

export function formatArticleDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  
  const day = date.getDate();
  const monthAbbr = date.toLocaleDateString("fr-FR", { month: "short" });
  const capitalizedMonth = monthAbbr.charAt(0).toUpperCase() + monthAbbr.slice(1);
  const year = date.getFullYear();

  return `${day} ${capitalizedMonth} ${year}`;
}

export function formatRelativeTime(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "À l'instant";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `Il y a ${diffInHours} heure${diffInHours > 1 ? "s" : ""}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? "s" : ""}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `Il y a ${diffInMonths} mois`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `Il y a ${diffInYears} an${diffInYears > 1 ? "s" : ""}`;
}
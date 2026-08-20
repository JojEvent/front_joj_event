// composants/carte/mapIcons.js
//
// Les icônes par défaut de Leaflet ne se chargent pas correctement avec
// Vite (chemins relatifs vers des images non bundlées). On construit donc
// nos propres pins en SVG via L.divIcon : plus fiable, et ça permet de
// distinguer visuellement une infrastructure "normale", une infrastructure
// sélectionnée, et la position de l'utilisateur.
import L from "leaflet";

function pinSvg(color) {
  return `
    <svg width="34" height="44" viewBox="0 0 34 44" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 0C7.6 0 0 7.6 0 17c0 12.75 17 27 17 27s17-14.25 17-27C34 7.6 26.4 0 17 0z" fill="${color}"/>
      <circle cx="17" cy="17" r="7" fill="white"/>
    </svg>
  `;
}

function makePinIcon(color) {
  return L.divIcon({
    html: pinSvg(color),
    className: "",
    iconSize: [34, 44],
    iconAnchor: [17, 44],
    popupAnchor: [0, -40],
  });
}

export const infrastructureIcon = makePinIcon("#16a34a"); // vert (secondary)
export const infrastructureSelectedIcon = makePinIcon("#dc2626"); // rouge, mise en avant

export const userLocationIcon = L.divIcon({
  html: `
    <div style="
      width:18px;height:18px;border-radius:50%;
      background:#0284c7;border:3px solid white;
      box-shadow:0 0 0 2px rgba(2,132,199,0.35);
    "></div>
  `,
  className: "",
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

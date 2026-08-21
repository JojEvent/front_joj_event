// Le backend (modèle Infrastructure) ne stocke pas de latitude/longitude
// propres à chaque infrastructure : seul SiteOlympique en a.
// Pour pouvoir afficher un pin distinct par infrastructure sur la carte
// (comme dans la maquette), on calcule un léger décalage déterministe
// autour des coordonnées du site. C'est un repère visuel, pas une position
// GPS exacte : idéalement, il faudrait ajouter latitude/longitude sur le
// modèle Infrastructure côté backend pour être 100% précis.

const OFFSET_DEGREES = 0.0035; // ~ 300 à 400 mètres autour du centre du site

export function getSiteCoords(site) {
  if (!site) return null;
  const lat = parseFloat(site.latitude);
  const lng = parseFloat(site.longitude);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
  return [lat, lng];
}

// Calcule une position "visuelle" pour une infrastructure : un point réparti
// en cercle autour du centre du site, à partir de son id (donc stable entre
// deux rendus / deux visites).
export function getInfrastructureCoords(site, infrastructure) {
  const siteCoords = getSiteCoords(site);
  if (!siteCoords) return null;

  const [lat, lng] = siteCoords;
  const angleDeg = (infrastructure.id * 53) % 360; // 53 : pas premier, répartit bien les points
  const angleRad = (angleDeg * Math.PI) / 180;

  return [
    lat + Math.cos(angleRad) * OFFSET_DEGREES,
    lng + Math.sin(angleRad) * OFFSET_DEGREES,
  ];
}

// Interroge le service public de routage OSRM (démo, sans clé API) pour
// obtenir un itinéraire routier entre deux points.
// À noter : c'est un serveur de démonstration gratuit, adapté pour du
// prototypage — pas garanti pour un usage en production à fort trafic.
export async function fetchRouteBetween(start, end) {
  if (!start || !end) return null;

  const [startLat, startLng] = start;
  const [endLat, endLng] = end;

  const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Impossible de calculer l'itinéraire.");
  }

  const data = await response.json();
  const route = data?.routes?.[0];
  if (!route) return null;

  // GeoJSON renvoie les coordonnées en [lng, lat] : on les repasse en [lat, lng] pour Leaflet.
  const path = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

  return {
    path,
    distanceKm: route.distance / 1000,
    durationMin: route.duration / 60,
  };
}


// PARTIE MODIFIE DE MON CODE
export function getDistanceMeters(a, b) {
  if (!a || !b) return null;
  const [lat1, lng1] = a;
  const [lat2, lng2] = b;

  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);

  const h =
    sinDLat * sinDLat +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * sinDLng * sinDLng;

  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

// Formatte une distance en mètres pour l'affichage : "850 m" en dessous de
// 1 km, "1,2 km" au-dessus, pour un affichage type guidage GPS.
export function formatDistance(meters) {
  if (meters == null) return "";
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}
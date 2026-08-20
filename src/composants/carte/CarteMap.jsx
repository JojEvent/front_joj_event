// composants/carte/CarteMap.jsx
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { Locate } from "lucide-react";
import {
  getSiteCoords,
  getInfrastructureCoords,
} from "../../utils/carteGeo";
import {
  infrastructureIcon,
  infrastructureSelectedIcon,
  userLocationIcon,
} from "./mapIcons";

// Coordonnées de repli si aucun site n'a encore de latitude/longitude
// renseignées côté admin (centre approximatif de Dakar).
const DEFAULT_CENTER = [14.6928, -17.4467];

// Petit composant interne : recentre/anime la carte quand la sélection
// (infrastructure choisie, itinéraire calculé) change. Doit être un enfant
// de <MapContainer> pour pouvoir utiliser useMap().
function MapController({ selectedCoords, userPosition, routePath }) {
  const map = useMap();

  useEffect(() => {
    if (routePath && routePath.length > 1) {
      map.flyToBounds(routePath, { padding: [60, 60], maxZoom: 16 });
    } else if (selectedCoords && userPosition) {
      map.flyToBounds([selectedCoords, userPosition], { padding: [60, 60], maxZoom: 16 });
    } else if (selectedCoords) {
      map.flyTo(selectedCoords, 16, { duration: 0.8 });
    }
  }, [selectedCoords, userPosition, routePath, map]);

  return null;
}

export default function CarteMap({
  site,
  infrastructures,
  selectedInfrastructureId,
  onSelectInfrastructure,
  userPosition,
  routePath,
  routeInfo,
  isLocating,
}) {
  const mapRef = useRef(null);
  const siteCoords = getSiteCoords(site) ?? DEFAULT_CENTER;

  const selectedInfra = infrastructures.find((i) => i.id === selectedInfrastructureId);
  const selectedCoords = selectedInfra
    ? getInfrastructureCoords(site, selectedInfra)
    : null;

  return (
    <div className="relative w-full h-full min-h-[520px] rounded-2xl overflow-hidden">
      <MapContainer
        ref={mapRef}
        center={siteCoords}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full min-h-[520px]"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {infrastructures.map((infra) => {
          const coords = getInfrastructureCoords(site, infra);
          if (!coords) return null;
          const isSelected = infra.id === selectedInfrastructureId;

          return (
            <Marker
              key={infra.id}
              position={coords}
              icon={isSelected ? infrastructureSelectedIcon : infrastructureIcon}
              eventHandlers={{
                click: () => onSelectInfrastructure(infra.id),
              }}
            >
              <Popup>
                <div className="font-olympic-medium text-sm">{infra.nom}</div>
                {infra.description && (
                  <div className="text-xs text-neutral-500 mt-1">{infra.description}</div>
                )}
              </Popup>
            </Marker>
          );
        })}

        {userPosition && (
          <Marker position={userPosition} icon={userLocationIcon}>
            <Popup>Votre position</Popup>
          </Marker>
        )}

        {routePath && routePath.length > 1 && (
          <Polyline positions={routePath} pathOptions={{ color: "#0284c7", weight: 5, opacity: 0.85 }} />
        )}

        <MapController
          selectedCoords={selectedCoords}
          userPosition={userPosition}
          routePath={routePath}
        />
      </MapContainer>

      {/* Bandeau d'info sur l'itinéraire en cours */}
      {(isLocating || routeInfo || (selectedInfra && !userPosition)) && (
        <div className="absolute left-4 bottom-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-4 py-3 flex items-start gap-2 z-[1000]">
          <Locate className="w-4 h-4 mt-0.5 text-sky-700 shrink-0" />
          <div className="text-xs text-neutral-700 font-olympic leading-5">
            {isLocating && "Localisation en cours pour calculer votre itinéraire..."}
            {!isLocating && routeInfo && (
              <>
                Itinéraire vers <span className="font-olympic-medium">{selectedInfra?.nom}</span> :{" "}
                {routeInfo.distanceKm.toFixed(1)} km · {Math.round(routeInfo.durationMin)} min
              </>
            )}
            {!isLocating && !routeInfo && selectedInfra && !userPosition && (
              <>
                Activez la localisation de votre navigateur pour être guidé jusqu'à{" "}
                <span className="font-olympic-medium">{selectedInfra?.nom}</span>.
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

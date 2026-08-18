import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

//Ce composant VenueMap sert à afficher une carte OpenStreetMap avec un marqueur à la position de ton infrastructure.
export default function VenueMap({ latitude, longitude, location }) {
  return (
    //la carte elle-même
    <MapContainer
      //position initiale
      center={[latitude, longitude]}
      //un niveau de zoom
      zoom={15}
      scrollWheelZoom={false}
      className="w-full h-72"
    >
      {/*TileLayer indique à Leaflet : Va chercher les images de la carte sur OpenStreetMap */}
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* C'est le marqueur placé sur la carte */}
      <Marker position={[latitude, longitude]}>
        {/* C'est la petite fenêtre qui apparaît lorsqu'on clique sur le marqueur */}
        <Popup>
          <strong>{location}</strong>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
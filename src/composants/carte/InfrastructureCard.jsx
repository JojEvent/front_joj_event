// composants/carte/InfrastructureCard.jsx
import { Navigation, ImageOff } from "lucide-react";

const getFullImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:")) {
    return url;
  }
  return `http://127.0.0.1:8000${url.startsWith("/") ? "" : "/"}${url}`;
};

export default function InfrastructureCard({
  infrastructure,
  // hubNumber,  poutr l'instant, à remettre si besoin
  isSelected,
  onSuivreItineraire,
}) {
  const disciplines = infrastructure.disciplines ?? [];
  const imageUrl = getFullImageUrl(infrastructure.image_infrastructure);

  return (
    <div
      className={[
        "w-full flex flex-col bg-white rounded-2xl border overflow-hidden transition-colors",
        isSelected ? "border-green-600 ring-1 ring-green-600" : "border-neutral-200",
      ].join(" ")}
    >
      <div className="relative w-full h-40 bg-neutral-100 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={infrastructure.nom}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
            <ImageOff className="w-6 h-6 text-neutral-400" />
          </div>
        )}

        {/* Enlevr Hub Number pour l'instant, à remettre si besoin
         <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-olympic-medium">
          Hub {hubNumber}
        </span> */}
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div>
          <h3 className="text-black text-base font-olympic-medium leading-5">
            {infrastructure.nom}
          </h3>
          {infrastructure.description && (
            <p className="text-neutral-500 text-sm font-olympic leading-5 line-clamp-1">
              {infrastructure.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {disciplines.length > 0 ? (
            disciplines.map((discipline) => (
              <span
                key={discipline.id}
                className="px-3 py-1 rounded-full bg-green-600 text-white text-[11px] font-olympic-medium uppercase tracking-wide"
              >
                {discipline.nom}
              </span>
            ))
          ) : (
            <span className="text-neutral-400 text-xs font-olympic">
              Aucune discipline renseignée
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onSuivreItineraire(infrastructure.id)}
          className="w-full mt-1 py-2.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-sm font-olympic-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Navigation className="w-4 h-4" />
          Suivre itinéraire
        </button>
      </div>
    </div>
  );
}

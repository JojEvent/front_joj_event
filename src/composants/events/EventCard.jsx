// components/events/EventCard.jsx
import { useState } from "react";
import { Heart, MapPin, Calendar } from "lucide-react";
import Badge from "./Badge";
import { toggleFavorite } from "../../services/events.service";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import defaultEventImage from "../../assets/basket.png";

/**
 * Composant EventCard (Liste d'événements)
 */
export default function EventCard({ event }) {
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(event?.isFavorite || false);
  const navigate = useNavigate();

  if (!event) return null;

  const handleCardClick = () => {
    navigate(`/evenements/${event.id}`);
  };

  const handleFavorite = async (e) => {
    if (e) e.stopPropagation();
    if (!isAuthenticated) return;

    const nouveauStatut = !isFavorite;
    setIsFavorite(nouveauStatut);

    try {
      await toggleFavorite(event.id);
    } catch (error) {
      console.error("Erreur lors du toggle favori API:", error);
      setIsFavorite(isFavorite);
    }
  };

  const tags = Array.isArray(event.tags) ? event.tags : [];

  return (
    <article
      onClick={handleCardClick}
      className="w-full max-w-[380px] flex flex-col justify-start items-start group cursor-pointer transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="w-full h-64 sm:h-72 pb-4 flex flex-col justify-start items-start">
        <div className="w-full h-full relative rounded-3xl overflow-hidden bg-slate-100 shadow-sm border border-gray-100">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={event.image || defaultEventImage}
            alt={event.title}
            onError={(e) => {
              e.currentTarget.src = defaultEventImage;
            }}
          />

          {/* Tags sport / catégorie en haut à gauche */}
          <div className="absolute left-3.5 top-3.5 flex flex-wrap justify-start items-start gap-1.5 z-10">
            {tags.map((tag, idx) => (
              <Badge key={tag.label || idx} {...tag} />
            ))}
          </div>

          {/* Favori en haut à droite */}
          {isAuthenticated && (
            <button
              type="button"
              onClick={handleFavorite}
              aria-label="Ajouter aux favoris"
              className="absolute right-3.5 top-3.5 size-9 bg-white/90 backdrop-blur-xs rounded-full border border-slate-200 shadow-sm flex items-center justify-center shrink-0 hover:bg-white transition cursor-pointer z-10"
            >
              <Heart
                className={`size-4 transition-colors ${
                  isFavorite ? "fill-rose-500 text-rose-500" : "text-zinc-800"
                }`}
              />
            </button>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-2 px-1">
        <div className="w-full flex justify-between items-start gap-2">
          <h3 className="text-zinc-900 text-xl sm:text-2xl font-bold font-['Olympic_Sans_Bold'] leading-7 sm:leading-8 group-hover:text-emerald-700 transition line-clamp-2">
            {event.title}
          </h3>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-1">
          <p className="text-red-600 text-base font-bold font-['Olympic_Sans_Bold'] flex items-center gap-1.5">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{event.date}</span>
          </p>
          <p className="text-stone-500 text-sm font-medium font-['Olympic_Sans_Medium'] flex items-center gap-1.5 line-clamp-1">
            <MapPin className="w-4 h-4 shrink-0 text-stone-400" />
            <span>{event.location}</span>
          </p>
        </div>

        {event.price && (
          <div className="w-full pt-1 flex justify-between items-center">
            <span className="text-zinc-900 text-sm font-bold font-['Olympic_Sans_Bold'] bg-gray-100 px-2.5 py-1 rounded-lg">
              {event.price}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
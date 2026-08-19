// components/events/EventCard.jsx
import { useState } from "react";
import { Heart } from "lucide-react";
import Badge from "./Badge";
import { toggleFavorite } from "../../services/events.service";
import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const [isFavorite, setIsFavorite] = useState(event.isFavorite);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/evenements/${event.id}`);
  };
  
  const handleFavorite = async () => {
    try {
      await toggleFavorite(event.id);

      setIsFavorite(true);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <article className="w-96 flex flex-col justify-start items-start">
      <div className="self-stretch h-80 pb-6 flex flex-col justify-start items-start">
        <div onClick={handleCardClick} className="self-stretch h-80 relative rounded-3xl flex flex-col justify-center items-start overflow-hidden cursor-pointer">
          <img className="self-stretch flex-1 object-cover" src={event.image} alt={event.title} />

          {/* Tags sport / médaille, en haut à gauche */}
          <div className="absolute left-4 top-4 flex justify-start items-start gap-2">
            {event.tags.map((tag) => (
              <Badge key={tag.label} {...tag} />
            ))}
          </div>
        </div>
      </div>

      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <div className="self-stretch flex justify-between items-start gap-2.5">
          <h3 className="text-zinc-900 text-2xl font-bold font-['Olympic_Sans_Bold'] leading-8">
            {event.title}
          </h3>

          <button
            type="button"
            onClick={handleFavorite}
            aria-label="Ajouter aux favoris"
            className="size-8 bg-white rounded-full border border-slate-200 flex items-center justify-center shrink-0"
          >
            <Heart
              className={`size-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-zinc-950"}`}
            />
          </button>
        </div>

        <div className="self-stretch flex flex-col justify-start items-start">
          <p className="text-red-600 text-lg font-bold font-['Olympic_Sans_Bold'] leading-7">
            {event.date}
          </p>
          <p className="text-stone-500 text-base font-medium font-['Olympic_Sans_Medium'] leading-6">
            {event.location}
          </p>
        </div>

        {/*<div className="self-stretch pt-4 flex justify-between items-center">
          <span className="text-zinc-900 text-lg font-bold font-['Olympic_Sans_Bold'] leading-7">
            {event.price}
          </span>
        </div>*/}
      </div>
    </article>
  );
}
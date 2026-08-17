import React, { useState } from "react";
import { Heart } from "lucide-react";

// Carte événement
const EventCard = ({
  title,
  date,
  location,
  price,
  image,
  tags = [],
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <article className="w-full max-w-[384px] flex flex-col">
      {/* ================= IMAGE ================= */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[30px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full text-[12px] font-bold uppercase tracking-[0.08em]"
              style={{
                backgroundColor: tag.color,
                color: tag.textColor || "#ffffff",
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* ================= INFORMATIONS ================= */}
      <div className="pt-4 flex flex-col">

        {/* Titre + favoris */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="flex-1 text-[20px] font-bold font-olympic leading-[1.35] text-zinc-900 line-clamp-2">
            {title}
          </h3>

          {/* Bouton favoris */}
          <button
            type="button"
            onClick={handleFavorite}
            aria-label={
              isFavorite
                ? "Retirer des favoris"
                : "Ajouter aux favoris"
            }
            aria-pressed={isFavorite}
            className={`
              w-9 h-9 shrink-0
              rounded-full
              flex items-center justify-center
              border
              transition-all duration-200
              hover:scale-105
              active:scale-95
              ${
                isFavorite
                  ? "bg-red-50 border-red-200"
                  : "bg-white border-slate-200 hover:bg-slate-50"
              }
            `}
          >
            <Heart
              size={18}
              strokeWidth={2}
              className={
                isFavorite
                  ? "text-red-600 fill-red-600"
                  : "text-zinc-900"
              }
            />
          </button>
        </div>

        {/* Date */}
        <p className="mt-1.5 text-[17px] font-bold font-olympic leading-6 text-red-600">
          {date}
        </p>

        {/* Lieu */}
        <p className="text-[16px] font-medium font-olympic-medium leading-6 text-stone-500">
          {location}
        </p>

        {/* Prix */}
        <p className="mt-3 text-[17px] font-bold font-olympic leading-6 text-zinc-900">
          {price}
        </p>
      </div>
    </article>
  );
};

export default EventCard;
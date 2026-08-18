import { formatEventDate } from "../../utils/formatDate";
import { MapPin, Calendar, Clock, Share2 } from "lucide-react";
import MetaItem from "./MetaItem";

export default function HeroSection({ event }) {
  return (
    <div className="w-full h-[600px] relative bg-white/0 rounded-3xl shadow-2xl overflow-hidden">
      <img className="w-full h-full object-cover absolute inset-0" src={event.image_principale} alt={event.titre} />
      <div className="absolute inset-0 p-12 bg-linear-270 from-black/80 via-black/20 to-black/0 flex flex-col justify-end items-start">
        <div className="pb-6 flex justify-start items-start gap-3">
          <span className="px-6 py-2 bg-sky-700 rounded-full text-white text-sm font-bold font-['Olympic_Sans_Bold'] uppercase leading-5 tracking-wide">
            {event.discipline.nom}
          </span>
          <span className="px-6 py-2 bg-white/20 rounded-full backdrop-blur-[6px] text-white text-sm font-bold font-['Olympic_Sans_Bold'] uppercase leading-5 tracking-wide">
            {event.type_evenement}
          </span>
        </div>

        <h1 className="pb-4 text-white text-7xl font-bold font-['Olympic_Headline'] uppercase leading-[72px]">
          {event.titre}
        </h1>

        <p className="max-w-[672px] pb-8 text-white/90 text-2xl font-normal font-['Olympic_Sans'] leading-8">
          {event.description}
        </p>

        <div className="flex justify-start items-start gap-12">
          <MetaItem icon={MapPin} label="Lieu" value={event.infrastructure.nom} />
          <MetaItem icon={Calendar} label="Date" value={formatEventDate(event.date_debut)} bordered />
          <MetaItem icon={Clock} label="Début" value={formatEventDate(event.date_debut)} bordered />
        </div>
      </div>

      <button
        type="button"
        aria-label="Partager"
        className="absolute right-8 top-8 p-4 bg-white/10 rounded-full backdrop-blur-[6px]"
      >
        <Share2 className="size-8 text-white" strokeWidth={2} />
      </button>
    </div>
  );
}

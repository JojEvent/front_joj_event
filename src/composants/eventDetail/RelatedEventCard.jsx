// composants/eventDetail/RelatedEventCard.jsx

export default function RelatedEventCard({ title, date_debut, discipline, sportColor, image }) {
  return (
    <article className="w-96 flex flex-col justify-start items-start gap-4">
      <div className="self-stretch h-48 relative rounded-2xl overflow-hidden">
        <img className="w-full h-full object-cover" src={image} alt={title} />
        <span
          className={`absolute left-4 top-4 px-3 py-1 rounded-full text-white text-xs font-bold font-['Olympic_Sans_Bold'] leading-4 tracking-tight ${sportColor}`}
        >
          {discipline}
        </span>
      </div>
      <div className="flex flex-col justify-start items-start">
        <h3 className="text-zinc-900 text-xl font-bold font-['Olympic_Sans_Bold'] leading-7">{title}</h3>
        <span className="text-stone-500 text-base font-normal font-['Olympic_Sans'] leading-6">{date_debut}</span>
      </div>
    </article>
  );
}

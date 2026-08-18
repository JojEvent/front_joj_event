// composants/eventDetail/RelatedEventsSection.jsx
import RelatedEventCard from "./RelatedEventCard";

export default function RelatedEventsSection({ events }) {
  return (
    <section className="self-stretch flex flex-col justify-start items-start gap-8">
      <h2 className="text-zinc-900 text-3xl font-bold font-['Olympic_Sans_Bold'] leading-9">
        Plus de compétitions
      </h2>

      <div className="self-stretch flex flex-col justify-start items-start gap-8">
        {events.map((event) => (
          <RelatedEventCard key={event.id} {...event} />
        ))}
      </div>
    </section>
  );
}

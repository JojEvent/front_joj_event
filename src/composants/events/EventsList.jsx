// components/events/EventsList.jsx
import EventCard from "./EventCard";

export default function EventsList({ events = [] }) {
  if (!events || events.length === 0) return null;

  return (
    <section className="w-full self-stretch pb-16 flex justify-center items-start px-4 sm:px-6">
      <div className="w-full max-w-[1220px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
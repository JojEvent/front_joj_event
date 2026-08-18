// components/events/EventsList.jsx
import EventCard from "./EventCard";

export default function EventsList({ events }) {
  return (
    <section className="self-stretch pb-24 flex justify-center items-start">
      <div className="w-full max-w-[1220px] grid grid-cols-3 gap-x-8 gap-y-14">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
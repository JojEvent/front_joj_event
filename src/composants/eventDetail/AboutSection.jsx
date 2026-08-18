// composants/eventDetail/AboutSection.jsx
import SectionTitle from "./SectionTitle";
import InfoCard from "./InfoCard";

export default function AboutSection({ event }) {
  return (
    <section className="self-stretch flex flex-col justify-start items-start gap-6">
      <SectionTitle color="bg-red-600">À propos de l'événement</SectionTitle>

      <p className="text-stone-500 text-lg font-normal font-['Olympic_Sans'] leading-7">
        {event.description}
      </p>

      <div className="self-stretch flex flex justify-start items-start gap-4">
        <div className="self-stretch p-6 bg-stone-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-100 flex flex-col justify-start items-start gap-1">
          <span className={`text-sm font-bold font-['Olympic_Sans_Bold'] uppercase leading-5 text-sky-700`}>
            Discipline
          </span>
          <span className="text-zinc-900 text-xl font-bold font-['Olympic_Sans_Bold'] leading-7">
            {event.discipline.nom}
          </span>
        </div>

        <div className="self-stretch p-6 bg-stone-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-100 flex flex-col justify-start items-start gap-1">
          <span className={`text-sm font-bold font-['Olympic_Sans_Bold'] uppercase leading-5 text-sky-700`}>
            Categorie
          </span>
          <span className="text-zinc-900 text-xl font-bold font-['Olympic_Sans_Bold'] leading-7">
            {event.categorie}
          </span>
        </div>
      </div>
    </section>
  );
}

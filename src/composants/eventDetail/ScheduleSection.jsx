// composants/eventDetail/ScheduleSection.jsx
import SectionTitle from "./SectionTitle";
import ScheduleItem from "./ScheduleItem";

export default function ScheduleSection({ schedule }) {
  return (
    <section className="self-stretch flex flex-col justify-start items-start gap-8">
      <SectionTitle color="bg-sky-700">Programme des combats</SectionTitle>

      <div className="self-stretch flex flex-col justify-start items-start gap-4">
        {schedule.map((item) => (
          <ScheduleItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}

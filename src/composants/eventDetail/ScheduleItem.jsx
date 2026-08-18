// composants/eventDetail/ScheduleItem.jsx

export default function ScheduleItem({ date_debut, color, titre, description }) {
  return (
    <div className="self-stretch p-6 bg-white rounded-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-100 flex justify-start items-center">
      <div className="w-20 flex flex-col justify-start items-center">
        <span className={`text-center text-xl text-red-600 font-bold font-['Olympic_Sans_Bold'] leading-7 ${color}`}>
          {new Date(date_debut).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
        </span>
      </div>
      <div className="flex-1 pl-8 flex flex-col justify-start items-start">
        <h3 className="text-zinc-900 text-lg font-bold font-['Olympic_Sans_Bold'] leading-7">{titre}</h3>
        <p className="text-stone-500 text-base font-normal font-['Olympic_Sans'] leading-6">{description}</p>
      </div>
    </div>
  );
}

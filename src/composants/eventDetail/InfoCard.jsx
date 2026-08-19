// composants/eventDetail/InfoCard.jsx

export default function InfoCard({ label, value, color = "text-sky-700" }) {
  return (
    <div className="self-stretch p-6 bg-stone-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-100 flex flex-col justify-start items-start gap-1">
      <span className={`text-sm font-bold font-['Olympic_Sans_Bold'] uppercase leading-5 ${color}`}>
        {label}
      </span>
      <span className="text-zinc-900 text-xl font-bold font-['Olympic_Sans_Bold'] leading-7">
        {value}
      </span>
    </div>
  );
}

// composants/eventDetail/MetaItem.jsx

export default function MetaItem({ icon: Icon, label, value, bordered = false }) {
  return (
    <div className={`flex justify-start items-center gap-3 ${bordered ? "pl-12 border-l border-white/20" : ""}`}>
      <Icon className="size-8 text-white" strokeWidth={2} />
      <div className="flex flex-col justify-start items-start">
        <span className="text-white/60 text-xs font-bold font-['Olympic_Sans_Bold'] uppercase leading-4 tracking-tight">
          {label}
        </span>
        <span className="text-white text-xl font-medium font-['Olympic_Sans_Medium'] leading-7 tracking-tight">
          {value}
        </span>
      </div>
    </div>
  );
}

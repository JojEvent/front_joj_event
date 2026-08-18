export default function TicketTypeSelector({
  types,
  selectedType,
  onChange,
}) {
  return (
    <div className="self-stretch p-4 bg-stone-50 rounded-2xl flex flex-col gap-2">

      <span className="text-stone-500 text-xs font-bold uppercase">
        Sélectionnez vos places
      </span>

      <div className="self-stretch flex justify-center items-start gap-2">

        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange?.(type)}
            className={`flex-1 py-2 rounded-lg outline outline-1 flex flex-col justify-center items-center ${
              selectedType === type
                ? "bg-Primaire outline-Primaire"
                : "bg-white outline-gray-200"
            }`}
          >
            <span
              className={`text-center text-sm font-bold ${
                selectedType === type
                  ? "text-white"
                  : "text-zinc-900"
              }`}
            >
              {type}
            </span>
          </button>
        ))}

      </div>
    </div>
  );
}
// components/events/ActiveFilters.jsx
import { X, ListFilter } from "lucide-react";

export default function ActiveFilters({ resultCount, filters, onRemove, onClearAll }) {
  return (
    <div className="self-stretch pt-6 border-t border-gray-100 flex justify-between items-center">
      <div className="flex justify-start items-center gap-2">
        <ListFilter className="size-5 text-Icon-Default-Default" strokeWidth={2} />
        <span className="text-zinc-900 text-sm font-bold font-['Olympic_Sans_Bold'] leading-5">
          {resultCount} événements trouvés
        </span>
      </div>

      {filters.length > 0 && (
        <div className="flex justify-start items-center gap-3">
          <span className="text-stone-500 text-xs font-bold font-['Olympic_Sans_Bold'] uppercase leading-4 tracking-wide">
            Filtres actifs :
          </span>

          {filters.map((filter) => (
            <div
              key={filter}
              className="px-3 py-1 bg-stone-50 rounded-full outline outline-1 outline-offset-[-1px] outline-gray-100 flex justify-start items-center gap-3"
            >
              <span className="text-zinc-900 text-xs font-bold font-['Olympic_Sans_Bold'] leading-4 tracking-tight">
                {filter}
              </span>
              <button type="button" onClick={() => onRemove?.(filter)} aria-label={`Retirer le filtre ${filter}`}>
                <X className="size-3 text-zinc-900" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={onClearAll}
            className="pl-4 text-center text-red-600 text-xs font-bold font-['Olympic_Sans_Bold'] leading-4"
          >
            Tout effacer
          </button>
        </div>
      )}
    </div>
  );
}
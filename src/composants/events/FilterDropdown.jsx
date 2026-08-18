// components/events/FilterDropdown.jsx
// Un seul composant pour les 4 dropdowns (Sport, Lieu, Date, Prix) :
// ça évite de dupliquer 4 fois le même markup et centralise le style.
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const current = value ?? options[0];

  return (
    <div className="flex-1 flex flex-col justify-start items-start gap-2 relative">
      <label className="text-Text-Default-Default text-base font-normal font-['Olympic_Sans'] leading-6">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="self-stretch h-10 min-w-28 pl-4 pr-3 py-3 bg-Background-Default-Default rounded-lg outline outline-1 outline-offset-[-0.50px] outline-Border-Default-Default flex justify-between items-center gap-2"
      >
        <span className="text-Text-Default-Default text-base font-normal font-['Olympic_Sans'] leading-4">
          {current}
        </span>
        <ChevronDown className="size-4 text-Icon-Default-Default" strokeWidth={1.6} />
      </button>

      {open && (
        <ul className="absolute top-full mt-1 z-10 w-full bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-0.50px] outline-Border-Default-Default overflow-hidden">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  onChange?.(opt);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm font-['Olympic_Sans'] text-Text-Default-Default hover:bg-stone-50"
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
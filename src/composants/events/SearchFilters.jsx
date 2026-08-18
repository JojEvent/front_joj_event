// components/events/SearchFilters.jsx
import { useState } from "react";
import { Search } from "lucide-react";
import FilterDropdown from "./FilterDropdown";
import ActiveFilters from "./ActiveFilters";
import { useSites } from "../../hooks/UseSites";

//const priceOptions = ["Moins 25K FCFA", "25K - 50K FCFA", "Plus de 50K FCFA"];

export default function SearchFilters({ resultCount, onSearch, dateOptions }) {
  const {
    disciplines,
    infrastructures,
    isLoading,
    error,
  } = useSites();

  // Les options viennent maintenant du backend
  const sportOptions = [
    "Tous les sports",
    ...disciplines.map((discipline) => discipline.nom),
  ];

  const lieuOptions = [
    "Tous les sites",
    ...infrastructures.map((infrastructure) => infrastructure.nom),
  ];

  const [sport, setSport] = useState("Tous les sports");
  const [lieu, setLieu] = useState("Tous les sites");
  const [date, setDate] = useState(dateOptions[0]);
  //const [prix, setPrix] = useState(priceOptions[0]);

  // Filtres actifs affichés en chips
  const activeFilters = [sport, lieu].filter(
    (v) => v && v !== "Tous les sports" && v !== "Tous les sites"
  );

  const handleSearch = () => {
    onSearch?.({
      sport,
      lieu,
      date
    });
  };

  const clearAll = () => {
  setSport("Tous les sports");
  setLieu("Tous les sites");
  setDate(dateOptions[0]);
  //setPrix(priceOptions[0]);

  onSearch?.({
    sport: "Tous les sports",
    lieu: "Tous les sites",
    date: dateOptions[0]
    //prix: priceOptions[0],
  });
};

  return (
    <section className="self-stretch pb-12 flex justify-center items-start">
      <div className="w-full max-w-[1220px] p-8 bg-white rounded-3xl shadow-[0px_20px_40px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-gray-100 flex flex-col justify-start items-start gap-8">
        <div className="self-stretch flex justify-start items-end gap-6">

          <FilterDropdown
            label="Sport"
            options={sportOptions}
            value={sport}
            onChange={setSport}
          />

          <FilterDropdown
            label="Lieu"
            options={lieuOptions}
            value={lieu}
            onChange={setLieu}
          />

          <FilterDropdown
            label="Date"
            options={dateOptions}
            value={date}
            onChange={setDate}
          />

        {/*<FilterDropdown
          label="Prix"
          options={priceOptions}
          value={prix}
          onChange={setPrix}
        />*/}

          <button
            type="button"
            onClick={handleSearch}
            className="h-14 px-8 py-4 bg-Primaire rounded-xl flex justify-center items-center gap-2 shrink-0 bg-blue-600"
          >
            <Search className="size-4 text-white" />

            <span className="text-white text-base font-bold font-['Olympic_Sans_Bold'] leading-6 tracking-tight ">
              Rechercher des événements
            </span>
          </button>
        </div>

        <ActiveFilters
          resultCount={resultCount}
          filters={activeFilters}
          onRemove={(f) => {
            if (f === sport) {
              setSport("Tous les sports");
            }

            if (f === lieu) {
              setLieu("Tous les sites");
            }
          }}
          onClearAll={clearAll}
        />
      </div>
    </section>
  );
}
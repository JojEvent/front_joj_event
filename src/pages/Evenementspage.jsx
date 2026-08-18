// pages/EvenementsPage.jsx
import { useState } from "react";
import HeroBanner from "../composants/events/HeroBanner";
import SearchFilters from "../composants/events/SearchFilters";
import EventsList from "../composants/events/EventsList";
import Pagination from "../composants/events/Pagination";
import { useEvents } from "../hooks/Usevents";

export default function EvenementsPage() {
  const { events, isLoading, error, refetch } = useEvents();
  console.log("je suis la", events);
  
  const [currentPage, setCurrentPage] = useState(1);
 // Filtres sélectionnés par l'utilisateur
  const [filters, setFilters] = useState({
    sport: "Tous les sports",
    lieu: "Tous les sites",
    date: "Toutes les dates",
  });

  const dateOptions = [
    "Toutes les dates",
    ...new Set(
      events.map((event) => event.date_debut)
    ),
  ];



  // Quand l'utilisateur clique sur "Rechercher"
  const handleSearch = (newFilters) => {
    console.log("FILTRES RECUS :", newFilters);
    setFilters(newFilters);
    setCurrentPage(1);
  };

   // Filtrage côté frontend
  const filteredEvents = events.filter((event) => {
  const sportOk =
    filters.sport === "Tous les sports" ||
    event.discipline?.toLowerCase() === filters.sport?.toLowerCase();

  const lieuOk =
    filters.lieu === "Tous les sites" ||
    event.location?.toLowerCase() === filters.lieu?.toLowerCase();

  const dateOk =
    filters.date === "Toutes les dates" ||
    event.date_debut === filters.date;

  return sportOk && lieuOk && dateOk;
});


    return (
    <div className="w-full bg-white flex flex-col justify-start items-center">
      <HeroBanner />
      <SearchFilters 
      resultCount={filteredEvents.length}
      onSearch={handleSearch}
      dateOptions={dateOptions}
      />
 
      {isLoading && (
        <div className="self-stretch pb-24 flex justify-center items-center">
          <p className="text-stone-500 text-base font-normal font-['Olympic_Sans']">
            Chargement des événements...
          </p>
        </div>
      )}
 
      {error && !isLoading && (
        <div className="self-stretch pb-24 flex flex-col justify-center items-center gap-4">
          <p className="text-red-600 text-base font-bold font-['Olympic_Sans_Bold']">
            Impossible de charger les événements. Vérifie que l'API tourne bien sur
            http://127.0.0.1:8000/.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="px-6 py-2 bg-Primaire rounded-lg text-white text-sm font-bold font-['Olympic_Sans_Bold']"
          >
            Réessayer
          </button>
        </div>
      )}
 
      {!isLoading && !error && filteredEvents.length === 0 && (
        <div className="self-stretch pb-24 flex justify-center items-center">
          <p className="text-stone-500 text-base font-normal font-['Olympic_Sans']">
            Aucun événement trouvé.
          </p>
        </div>
      )}
 
      {!isLoading && !error && filteredEvents.length > 0 && (
        <>
          <EventsList events={filteredEvents} />
          <Pagination currentPage={currentPage} totalPages={10} onChange={setCurrentPage} />
        </>
      )}
    </div>
  );
}
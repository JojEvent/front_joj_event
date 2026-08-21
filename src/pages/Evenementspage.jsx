// pages/EvenementsPage.jsx
import { useState, useMemo } from "react";
import Header from "../composants/header";
import Footer from "../composants/footer";
import HeroBanner from "../composants/events/HeroBanner";
import SearchFilters from "../composants/events/SearchFilters";
import EventsList from "../composants/events/EventsList";
import Pagination from "../composants/events/Pagination";
import { useEvents } from "../hooks/Usevents";

export default function EvenementsPage() {
  const { events = [], isLoading, error, refetch } = useEvents();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtres sélectionnés par l'utilisateur
  const [filters, setFilters] = useState({
    sport: "Tous les sports",
    lieu: "Tous les sites",
    date: "Toutes les dates",
  });

  const dateOptions = useMemo(() => {
    return [
      "Toutes les dates",
      ...new Set((events || []).map((event) => event.date_debut).filter(Boolean)),
    ];
  }, [events]);

  // Quand l'utilisateur clique sur "Rechercher"
  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Filtrage côté frontend
  const filteredEvents = useMemo(() => {
    return (events || []).filter((event) => {
      const sportOk =
        !filters.sport ||
        filters.sport === "Tous les sports" ||
        event.discipline?.toLowerCase() === filters.sport?.toLowerCase();

      const lieuOk =
        !filters.lieu ||
        filters.lieu === "Tous les sites" ||
        event.location?.toLowerCase().includes(filters.lieu?.toLowerCase()) ||
        filters.lieu?.toLowerCase().includes(event.location?.toLowerCase());

      const dateOk =
        !filters.date ||
        filters.date === "Toutes les dates" ||
        event.date_debut === filters.date ||
        event.date?.includes(filters.date);

      return sportOk && lieuOk && dateOk;
    });
  }, [events, filters]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage) || 1;

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(start, start + itemsPerPage);
  }, [filteredEvents, currentPage, itemsPerPage]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between items-center">
      <Header />

      <main className="w-full flex-1 flex flex-col items-center">
        <HeroBanner />
        <SearchFilters
          resultCount={filteredEvents.length}
          onSearch={handleSearch}
          dateOptions={dateOptions}
        />

        {isLoading && (
          <div className="self-stretch py-24 flex flex-col justify-center items-center gap-3">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-stone-500 text-base font-normal font-['Olympic_Sans']">
              Chargement des événements...
            </p>
          </div>
        )}

        {error && !isLoading && (
          <div className="self-stretch py-24 flex flex-col justify-center items-center gap-4 px-4 text-center">
            <p className="text-red-600 text-base font-bold font-['Olympic_Sans_Bold']">
              Impossible de charger les événements. Vérifiez la connexion au serveur.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="px-6 py-2.5 bg-emerald-600 rounded-xl text-white text-sm font-bold font-['Olympic_Sans_Bold'] hover:bg-emerald-700 transition cursor-pointer shadow-sm"
            >
              Réessayer
            </button>
          </div>
        )}

        {!isLoading && !error && filteredEvents.length === 0 && (
          <div className="self-stretch py-24 flex flex-col justify-center items-center gap-2 px-4 text-center">
            <p className="text-stone-700 text-lg font-bold">
              Aucun événement trouvé
            </p>
            <p className="text-stone-500 text-sm">
              Essayez de modifier vos filtres de recherche.
            </p>
          </div>
        )}

        {!isLoading && !error && filteredEvents.length > 0 && (
          <>
            <EventsList events={paginatedEvents} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 500, behavior: "smooth" });
              }}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
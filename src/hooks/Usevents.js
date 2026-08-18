// useCallback permet de mémoriser une fonction entre les rendus
// veux mémoriser fetchEvents pour éviter de recréer cette fonction à chaque rendu
import { useState, useEffect, useCallback } from "react";
import { getEvents } from "../services/events.service";
// sert à adapter les données du backend au format dont ton frontend a besoin.
import { mapEventsFromApi } from "../utils/eventsAdapter";

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // récupérer les événements du backend.
  // React garde cette fonction tant que activeFilters ne change pas.
  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getEvents();
      const rawEvents = Array.isArray(data) ? data : data.results ?? [];
      setEvents(mapEventsFromApi(rawEvents));
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
    // on dit  react garde la même fonction fetchEvents tant que activeFilters ne change pas
    // Si activeFilters change, crée une nouvelle version de fetchEvents
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, isLoading, error, refetch: fetchEvents };
}
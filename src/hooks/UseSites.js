import { useEffect, useState } from "react";
import {
  getDisciplines,
  getInfrastructures,
} from "../services/sites.service";

export function useSites() {
  const [disciplines, setDisciplines] = useState([]);
  const [infrastructures, setInfrastructures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSitesData() {
      setIsLoading(true);
      setError(null);

      try {
        //avec Promise.all(), les deux requêtes sont lancées en parallèle
        //Promise.all() retourne un tableau dans le même ordre que les promesses que tu lui donnes.
        //on utilise la déstructuration de tableau (array destructuring).
        const [disciplinesData, infrastructuresData] = await Promise.all([
          getDisciplines(),
          getInfrastructures(),
        ]);

        setDisciplines(disciplinesData);
        setInfrastructures(infrastructuresData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSitesData();
  }, []);

  return {
    disciplines,
    infrastructures,
    isLoading,
    error,
  };
}
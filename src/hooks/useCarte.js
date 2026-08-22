// hooks/useCarte.js
import { useCallback, useEffect, useState } from "react";
import { getSites, getInfrastructures } from "../services/sites.service";

export function useCarte() {
  const [sites, setSites] = useState([]);
  const [infrastructures, setInfrastructures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCarteData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Les deux requêtes sont indépendantes : on les lance en parallèle.
      const [sitesData, infrastructuresData] = await Promise.all([
        getSites(),
        getInfrastructures({ actif: true }),
      ]);

      const rawSites = Array.isArray(sitesData) ? sitesData : sitesData.results ?? [];
      const rawInfrastructures = Array.isArray(infrastructuresData)
        ? infrastructuresData
        : infrastructuresData.results ?? [];

      setSites(rawSites);
      setInfrastructures(rawInfrastructures);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCarteData();
  }, [fetchCarteData]);

  // Regroupe les infrastructures par site (via infra.site.id, renvoyé par
  // InfrastructureDetailSerializer) pour alimenter les onglets Dakar /
  // Diamniadio / Saly... et leurs listes respectives.
  const infrastructuresBySite = infrastructures.reduce((acc, infra) => {
    const siteId = infra.site?.id;
    if (!siteId) return acc;
    if (!acc[siteId]) acc[siteId] = [];
    acc[siteId].push(infra);
    return acc;
  }, {});

  return {
    sites,
    infrastructures,
    infrastructuresBySite,
    isLoading,
    error,
    refetch: fetchCarteData,
  };
}

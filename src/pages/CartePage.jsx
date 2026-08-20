// pages/CartePage.jsx
import { useEffect, useMemo, useState } from "react";
import { Loader } from "lucide-react";
import Header from "../composants/header";
import Footer from "../composants/footer";
import CarteHero from "../composants/carte/CarteHero";
import InfrastructureList from "../composants/carte/InfrastructureList";
import CarteMap from "../composants/carte/CarteMap";
import { useCarte } from "../hooks/useCarte";
import { getInfrastructureCoords, fetchRouteBetween } from "../utils/carteGeo";

export default function CartePage() {
  const { sites, infrastructuresBySite, isLoading, error, refetch } = useCarte();

  const [activeSiteId, setActiveSiteId] = useState(null);
  const [selectedInfrastructureId, setSelectedInfrastructureId] = useState(null);

  const [userPosition, setUserPosition] = useState(null);
  const [routePath, setRoutePath] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // Sélectionne le premier site disponible dès que la liste arrive.
  useEffect(() => {
    if (!activeSiteId && sites.length > 0) {
      setActiveSiteId(sites[0].id);
    }
  }, [sites, activeSiteId]);

  const activeSite = useMemo(
    () => sites.find((s) => s.id === activeSiteId) ?? null,
    [sites, activeSiteId]
  );

  const activeInfrastructures = infrastructuresBySite[activeSiteId] ?? [];

  const handleChangeSite = (siteId) => {
    setActiveSiteId(siteId);
    setSelectedInfrastructureId(null);
    setUserPosition(null);
    setRoutePath(null);
    setRouteInfo(null);
  };

  // Point 6 du brief : "Suivre itinéraire" amène sur la carte et guide vers
  // l'infrastructure choisie (à partir de la position de l'utilisateur si
  // le navigateur l'autorise).
  const handleSuivreItineraire = (infrastructureId) => {
    setSelectedInfrastructureId(infrastructureId);
    setRoutePath(null);
    setRouteInfo(null);

    const infra = activeInfrastructures.find((i) => i.id === infrastructureId);
    const destination = getInfrastructureCoords(activeSite, infra);
    if (!destination || !navigator.geolocation) {
      setUserPosition(null);
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const origin = [position.coords.latitude, position.coords.longitude];
        setUserPosition(origin);

        try {
          const route = await fetchRouteBetween(origin, destination);
          if (route) {
            setRoutePath(route.path);
            setRouteInfo({ distanceKm: route.distanceKm, durationMin: route.durationMin });
          }
        } catch (err) {
          console.error("Erreur de calcul d'itinéraire :", err);
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        // Géolocalisation refusée ou indisponible : on garde simplement le
        // marqueur sélectionné et on recentre la carte dessus.
        setUserPosition(null);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-[1220px] mx-auto flex flex-col gap-10 pb-16">
        <CarteHero />

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-stone-600">
            <Loader className="w-8 h-8 animate-spin text-green-600" />
            <p className="text-sm font-olympic">Chargement de la carte...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-red-600 text-sm font-olympic-medium text-center">
              Impossible de charger les sites olympiques. Vérifiez la connexion à l'API.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="px-6 py-2 bg-green-600 rounded-lg text-white text-sm font-olympic-medium hover:bg-green-700 transition-colors cursor-pointer"
            >
              Réessayer
            </button>
          </div>
        )}

        {!isLoading && !error && sites.length === 0 && (
          <p className="text-center text-neutral-400 text-sm font-olympic py-20">
            Aucun site olympique n'est disponible pour le moment.
          </p>
        )}

        {!isLoading && !error && sites.length > 0 && (
          <section className="w-full px-4 flex flex-col lg:flex-row gap-8">
            <InfrastructureList
              sites={sites}
              activeSiteId={activeSiteId}
              onChangeSite={handleChangeSite}
              infrastructures={activeInfrastructures}
              selectedInfrastructureId={selectedInfrastructureId}
              onSuivreItineraire={handleSuivreItineraire}
            />

            <div className="flex-1 min-h-[520px]">
              <CarteMap
                site={activeSite}
                infrastructures={activeInfrastructures}
                selectedInfrastructureId={selectedInfrastructureId}
                onSelectInfrastructure={setSelectedInfrastructureId}
                userPosition={userPosition}
                routePath={routePath}
                routeInfo={routeInfo}
                isLocating={isLocating}
              />
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}

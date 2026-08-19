import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Importer les composants Header et Footer
import Header from "../composants/header";
import Footer from "../composants/footer";

// Importer l'icône coeur de lucide-react
import { Heart } from "lucide-react";

// Importer les services d'API pour les favoris et les événements
import { getUserFavorites, removeFavorite } from "../services/profile.service";
import { getEvents } from "../services/events.service";

// Importer une image par défaut si un événement n'a pas d'image
import ImageParDefaut from "../assets/event_judo.png";

// Page de gestion des favoris (Mes Souhaits)
export default function Favoris() {
  // Liste des favoris de l'utilisateur
  const [listeFavoris, setListeFavoris] = useState([]);

  // État de chargement
  const [chargement, setChargement] = useState(true);

  // Charger la liste des favoris lors de l'ouverture de la page
  useEffect(() => {
    chargerLesFavoris();
  }, []);

  // Fonction pour charger la liste des favoris depuis le serveur backend (API)
  const chargerLesFavoris = async () => {
    setChargement(true);

    try {
      // Récupérer la liste des favoris de l'utilisateur connecté
      const reponseFavoris = await getUserFavorites();
      const favorisApi = Array.isArray(reponseFavoris)
        ? reponseFavoris
        : reponseFavoris?.results || [];

      if (favorisApi.length > 0) {
        // Récupérer la liste globale des événements pour obtenir tous les détails (titre, date, lieu, image)
        const reponseEvents = await getEvents();
        const tousLesEvenements = Array.isArray(reponseEvents)
          ? reponseEvents
          : reponseEvents?.results || [];

        // Associer chaque favori aux informations complètes de l'événement
        const listeEvenementsFavoris = favorisApi
          .map((itemFavori) => {
            const idEvenement = itemFavori.evenement || itemFavori.evenement_id || itemFavori.id;
            const eventTrouve = tousLesEvenements.find((ev) => ev.id === idEvenement);
            if (eventTrouve) {
              return {
                id: eventTrouve.id,
                favoriteId: itemFavori.id,
                titre: eventTrouve.titre || eventTrouve.title,
                date: eventTrouve.date_debut || eventTrouve.date,
                lieu: eventTrouve.infrastructure?.nom || eventTrouve.location,
                image: eventTrouve.image_principale || eventTrouve.image || ImageParDefaut,
              };
            }
            return null;
          })
          .filter(Boolean);

        setListeFavoris(listeEvenementsFavoris);
      } else {
        setListeFavoris([]);
      }
    } catch (erreurApi) {
      console.error("Erreur lors du chargement des favoris API:", erreurApi);
      setListeFavoris([]);
    }

    setChargement(false);
  };

  // Fonction pour retirer un événement des favoris
  const retirerDesFavoris = async (idEvent, favoriteId) => {
    // Retirer directement l'élément de l'affichage local
    setListeFavoris((prev) => prev.filter((item) => item.id !== idEvent));

    // Envoyer la demande de suppression au serveur backend
    try {
      if (favoriteId) {
        await removeFavorite(favoriteId);
      }
    } catch (err) {
      console.error("Erreur lors de la suppression du favori sur l'API:", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between">
      {/* En-tête principal */}
      <Header />

      {/* Contenu de la page */}
      <main className="w-full flex-1 max-w-[1322px] mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold font-['Olympic_Sans_Bold'] text-black uppercase mb-10 tracking-tight">
          Liste des favoris
        </h1>

        {/* 1. Affichage pendant le chargement */}
        {chargement ? (
          <div className="py-20 text-center">
            <p className="text-gray-500 text-lg animate-pulse font-medium">
              Chargement de vos favoris...
            </p>
          </div>
        ) : listeFavoris.length === 0 ? (
          /* 2. Affichage si aucun favori */
          <div className="py-16 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-2">
              <Heart className="w-8 h-8 stroke-[1.5]" />
            </div>
            <p className="text-gray-700 text-xl font-semibold">
              Vous n'avez aucun événement dans vos souhaits pour le moment.
            </p>
            <p className="text-gray-500 max-w-md text-sm">
              Parcourez les événements JOJ Dakar 2026 et cliquez sur le cœur pour ajouter vos épreuves préférées !
            </p>
            <Link
              to="/evenements"
              className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow transition-colors"
            >
              Découvrir les événements
            </Link>
          </div>
        ) : (
          /* 3. Grille des favoris */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
            {listeFavoris.map((evenement) => {
              const titre = evenement.titre || evenement.title;
              const date = evenement.date || evenement.date_debut;
              const lieu = evenement.lieu || evenement.location;
              const image = evenement.image || ImageParDefaut;

              return (
                <div
                  key={evenement.id}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-2 rounded-2xl transition-all"
                >
                  {/* Photo de l'événement */}
                  <div className="w-full sm:w-56 h-44 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                    <img
                      src={image}
                      alt={titre}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = ImageParDefaut;
                      }}
                    />
                  </div>

                  {/* Détails et actions */}
                  <div className="flex-1 w-full flex flex-col justify-between h-44 py-1">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h2 className="text-lg font-bold text-gray-900 leading-snug">
                          {titre}
                        </h2>

                        {/* Bouton pour retirer des favoris */}
                        <button
                          type="button"
                          onClick={() => retirerDesFavoris(evenement.id, evenement.favoriteId)}
                          className="p-1 text-red-500 hover:scale-110 transition-transform cursor-pointer"
                          title="Retirer des favoris"
                        >
                          <Heart fill="#ef4444" className="w-5 h-5 text-red-500" />
                        </button>
                      </div>

                      <p className="text-sm text-gray-500 mt-2 font-medium">
                        {date}
                      </p>

                      <p className="text-sm text-gray-500 font-medium">
                        {lieu}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination si liste non vide */}
        {!chargement && listeFavoris.length > 0 && (
          <div className="flex justify-center items-center mt-14 mb-8">
            <button
              type="button"
              className="w-9 h-9 bg-neutral-900 text-white font-medium rounded-lg flex items-center justify-center cursor-default"
            >
              1
            </button>
          </div>
        )}
      </main>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}

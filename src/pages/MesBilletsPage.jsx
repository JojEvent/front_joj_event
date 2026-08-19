import React, { useState, useEffect } from "react";
import Header from "../composants/header";
import Footer from "../composants/footer";
import { instance } from "../services/api";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Ticket, Calendar, MapPin, Loader, AlertCircle } from "lucide-react";

export default function MesBilletsPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [billets, setBillets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }

    const fetchBillets = async () => {
      setLoading(true);
      try {
        // L'API backend filtre automatiquement pour ne renvoyer QUE les billets de l'utilisateur connecté
        const response = await instance.get("billets/");
        const data = Array.isArray(response.data) ? response.data : response.data.results || [];
        setBillets(data);
      } catch (err) {
        console.error("Erreur chargement des billets:", err);
        setError("Impossible de charger vos billets pour le moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchBillets();
  }, [isAuthenticated, navigate]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(billets.length / itemsPerPage);
  const displayedBillets = billets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-olympic">
      <Header />

      <main className="flex-1 max-w-[1322px] w-full mx-auto px-4 lg:px-[59px] py-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-black uppercase tracking-wide mb-8">
          MES BILLETS
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-stone-600">
            <Loader className="w-8 h-8 animate-spin text-green-600" />
            <p className="text-base font-medium">Chargement de vos billets en cours...</p>
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 my-6">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p>{error}</p>
          </div>
        ) : billets.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-stone-200 my-6 flex flex-col items-center justify-center gap-4">
            <Ticket className="w-16 h-16 text-stone-300" />
            <h2 className="text-xl font-semibold text-stone-700">Vous n'avez aucun billet pour l'instant</h2>
            <p className="text-stone-500 max-w-md">
              Découvrez nos événements à venir et réservez vos billets pour vivre l'expérience des JOJ Dakar 2026.
            </p>
            <button
              onClick={() => navigate("/evenements")}
              className="mt-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow transition-colors"
            >
              Découvrir les Événements
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {displayedBillets.map((billet) => (
              <div
                key={billet.id}
                className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow"
              >
                {/* Section Gauche : Image + Informations Billet */}
                <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                  <div className="w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                    {billet.evenement_image ? (
                      <img
                        src={
                          billet.evenement_image.startsWith("http")
                            ? billet.evenement_image
                            : `http://127.0.0.1:8000${billet.evenement_image}`
                        }
                        alt={billet.evenement_titre || "Événement JOJ"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400">
                        <Ticket className="w-10 h-10" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 text-center sm:text-left">
                    <h2 className="text-lg lg:text-xl font-bold text-black leading-snug">
                      {billet.evenement_titre || "Événement JOJ Dakar 2026"}
                    </h2>
                    
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-sm text-stone-600">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-4 h-4 text-green-600" />
                        {billet.evenement_date
                          ? new Date(billet.evenement_date).toLocaleDateString("fr-FR", {
                              weekday: "short",
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Date à venir"}
                      </span>

                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
                        Type: {billet.type_billet || "Standard"}
                      </span>
                    </div>

                    <div className="text-xs text-stone-500 flex flex-wrap justify-center sm:justify-start items-center gap-3 mt-1">
                      {billet.evenement_lieu && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          {billet.evenement_lieu}
                        </span>
                      )}
                      <span>Prix: {billet.prix ? `${billet.prix} FCFA` : "Gratuit"}</span>
                      <span
                        className={`font-semibold ${
                          billet.statut === "VALIDE"
                            ? "text-green-600"
                            : billet.statut === "UTILISE"
                            ? "text-blue-600"
                            : "text-red-600"
                        }`}
                      >
                        • {billet.statut || "VALIDE"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section Droite : QR Code dynamique & Action */}
                <div className="shrink-0 flex flex-col items-center justify-center p-3 bg-stone-50 rounded-xl border border-stone-100 gap-2">
                  {billet.qr_code ? (
                    <img
                      src={
                        billet.qr_code.startsWith("http")
                          ? billet.qr_code
                          : `http://127.0.0.1:8000${billet.qr_code}`
                      }
                      alt="QR Code Billet"
                      className="w-24 h-24 lg:w-28 lg:h-28 object-contain bg-white p-1 rounded-lg shadow-sm"
                    />
                  ) : (
                    <div className="w-24 h-24 lg:w-28 lg:h-28 flex flex-col items-center justify-center text-xs text-stone-400 text-center p-2 border border-dashed border-stone-300 rounded-lg">
                      <Ticket className="w-6 h-6 mb-1" />
                      QR Code indisponible
                    </div>
                  )}
                  <span className="text-[10px] text-stone-500 font-mono">
                    #{billet.code_unique ? billet.code_unique.slice(0, 8) : billet.id}
                  </span>
                  <button
                    onClick={() => window.print()}
                    className="w-full mt-1 px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    Imprimer / PDF
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination si plus de 5 billets */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg font-medium text-sm transition-colors ${
                      currentPage === page
                        ? "bg-neutral-800 text-white"
                        : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

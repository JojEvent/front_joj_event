import React, { useState, useEffect, useMemo } from "react";
import HeaderAdmin from "../../composants/admin/header";
import EvenementForm from "../../composants/admin/evenementForm";
import { instanceApi } from "../../services/api";
import { Search, Plus, Edit2, Trash2, Eye } from "lucide-react";
import { toast } from "react-toastify";
import { formatEventDate } from "../../utils/formatDate";

const STATUT_BADGES = {
  BROUILLON: { label: "À VENIR", bg: "bg-blue-50 text-blue-600 border-blue-100" },
  PUBLIE: { label: "À VENIR", bg: "bg-blue-50 text-blue-600 border-blue-100" },
  EN_COURS: { label: "EN COURS", bg: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  TERMINE: { label: "TERMINÉ", bg: "bg-gray-100 text-gray-600 border-gray-200" },
  ANNULE: { label: "ANNULÉ", bg: "bg-rose-50 text-rose-600 border-rose-100" },
};

export default function EvenementAdmin() {
  const [events, setEvents] = useState([]);
  const [sites, setSites] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedSite, setSelectedSite] = useState("all");
  const [selectedDiscipline, setSelectedDiscipline] = useState("all");
  const [selectedStatut, setSelectedStatut] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const [eventsRes, sitesRes, discRes] = await Promise.allSettled([
        instanceApi.get("/evenements/"),
        instanceApi.get("/sites/"),
        instanceApi.get("/disciplines/"),
      ]);

      if (eventsRes.status === "fulfilled" && Array.isArray(eventsRes.value?.data)) {
        setEvents(eventsRes.value.data);
      }
      if (sitesRes.status === "fulfilled" && Array.isArray(sitesRes.value?.data)) {
        setSites(sitesRes.value.data);
      }
      if (discRes.status === "fulfilled" && Array.isArray(discRes.value?.data)) {
        setDisciplines(discRes.value.data);
      }
    } catch (error) {
      console.error("Erreur chargement événements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      return;
    }

    try {
      await instanceApi.delete(`/evenements/${id}/`);
      toast.success("Événement supprimé avec succès");
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'événement");
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const titleMatch = (ev.titre || "").toLowerCase().includes(search.toLowerCase());
      const siteMatch =
        selectedSite === "all" ||
        String(ev.infrastructure?.site?.id || ev.infrastructure?.site) === String(selectedSite);
      const discMatch =
        selectedDiscipline === "all" ||
        String(ev.discipline?.id || ev.discipline) === String(selectedDiscipline);
      const statutMatch = selectedStatut === "all" || ev.statut === selectedStatut;

      return titleMatch && siteMatch && discMatch && statutMatch;
    });
  }, [events, search, selectedSite, selectedDiscipline, selectedStatut]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage) || 1;
  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(start, start + itemsPerPage);
  }, [filteredEvents, currentPage]);

  const handleOpenCreate = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingEvent(null);
    fetchEvents();
  };

  return (
    <div className="flex flex-col w-full min-h-full pb-12 bg-gray-50/60">
      <HeaderAdmin />

      <div className="px-6 sm:px-8 py-6 w-full max-w-7xl mx-auto space-y-6">
        {isFormOpen ? (
          <EvenementForm
            initialData={editingEvent}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingEvent(null);
            }}
            onSuccess={handleFormSuccess}
            onDelete={async (id) => {
              await handleDelete(id);
              setIsFormOpen(false);
              setEditingEvent(null);
            }}
          />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Gestion des Événements
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Créez et gérez les événements sportifs des JOJ Dakar 2026.
                </p>
              </div>
              <button
                onClick={handleOpenCreate}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition shadow-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Créer un événement</span>
              </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Rechercher un événement..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-800 placeholder-gray-400 border border-gray-200/80 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto">
                <select
                  value={selectedSite}
                  onChange={(e) => {
                    setSelectedSite(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">Tous les Sites</option>
                  {sites.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nom}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDiscipline}
                  onChange={(e) => {
                    setSelectedDiscipline(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">Toutes les disciplines</option>
                  {disciplines.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nom}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStatut}
                  onChange={(e) => {
                    setSelectedStatut(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">Tous les Statuts</option>
                  <option value="BROUILLON">Brouillon</option>
                  <option value="PUBLIE">Publié</option>
                  <option value="EN_COURS">En cours</option>
                  <option value="TERMINE">Terminé</option>
                  <option value="ANNULE">Annulé</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0px_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50/75 border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-5">Événement</th>
                      <th className="py-3.5 px-4">Discipline</th>
                      <th className="py-3.5 px-4">Site / Lieu</th>
                      <th className="py-3.5 px-4">Date & Heure</th>
                      <th className="py-3.5 px-4">Capacité</th>
                      <th className="py-3.5 px-4">Statut</th>
                      <th className="py-3.5 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700 font-normal">
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-gray-400 text-sm">
                          Chargement des événements...
                        </td>
                      </tr>
                    ) : paginatedEvents.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-gray-400 text-sm">
                          Aucun événement trouvé.
                        </td>
                      </tr>
                    ) : (
                      paginatedEvents.map((ev) => {
                        const statutInfo = STATUT_BADGES[ev.statut] || STATUT_BADGES.BROUILLON;
                        const formattedDateTime = ev.date_debut
                          ? formatEventDate(ev.date_debut)
                          : "Non programmée";
                        const disciplineName = ev.discipline?.nom || "Sport";
                        const infrastructureName = ev.infrastructure?.nom || "Lieu à définir";
                        const capacite = ev.jauge_totale || ev.infrastructure?.capacite || "—";

                        return (
                          <tr key={ev.id} className="hover:bg-gray-50/50 transition">
                            <td className="py-4 px-5 font-bold text-gray-900 text-sm">
                              {ev.titre}
                            </td>
                            <td className="py-4 px-4 text-gray-600 font-medium">
                              {disciplineName}
                            </td>
                            <td className="py-4 px-4 text-gray-500 font-medium">
                              {infrastructureName}
                            </td>
                            <td className="py-4 px-4 text-gray-500 font-medium">
                              {formattedDateTime}
                            </td>
                            <td className="py-4 px-4 text-gray-900 font-medium">
                              {capacite}
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statutInfo.bg}`}
                              >
                                {statutInfo.label}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-right">
                              <div className="inline-flex items-center gap-1.5 text-gray-400">
                                <button
                                  onClick={() => handleOpenEdit(ev)}
                                  className="p-1.5 rounded-lg hover:bg-gray-100 hover:text-gray-800 transition"
                                  title="Modifier"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(ev.id)}
                                  className="p-1.5 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition"
                                  title="Supprimer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {!loading && filteredEvents.length > 0 && (
                <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
                  <div>
                    Affichage de {paginatedEvents.length} sur {filteredEvents.length} événement(s)
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      Précédent
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        onClick={() => setCurrentPage(num)}
                        className={`w-7 h-7 rounded-lg text-xs font-medium transition ${
                          currentPage === num
                            ? "bg-emerald-500 text-white font-bold"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
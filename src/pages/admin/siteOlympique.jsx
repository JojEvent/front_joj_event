import React, { useState, useEffect, useMemo } from "react";
import HeaderAdmin from "../../composants/admin/header";
import SiteOlympiqueForm from "../../composants/admin/siteOlympiqueForm";
import { instanceApi } from "../../services/api";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";

export default function SiteOlympiqueAdmin() {
  const [sites, setSites] = useState([]);
  const [infrastructures, setInfrastructures] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeSiteFilter, setActiveSiteFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInfra, setEditingInfra] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sitesRes, infraRes] = await Promise.allSettled([
        instanceApi.get("/sites/"),
        instanceApi.get("/infrastructures/"),
      ]);

      if (sitesRes.status === "fulfilled" && Array.isArray(sitesRes.value?.data)) {
        setSites(sitesRes.value.data);
      }
      if (infraRes.status === "fulfilled" && Array.isArray(infraRes.value?.data)) {
        setInfrastructures(infraRes.value.data);
      }
    } catch (error) {
      console.error("Erreur chargement sites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteInfra = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette infrastructure / ce site ?")) {
      return;
    }

    try {
      await instanceApi.delete(`/infrastructures/${id}/`);
      toast.success("Supprimé avec succès");
      setInfrastructures((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const filteredInfrastructures = useMemo(() => {
    if (activeSiteFilter === "all") return infrastructures;
    return infrastructures.filter((inf) => {
      const siteName = inf.site?.nom || "";
      const siteId = inf.site?.id || inf.site;
      return String(siteId) === String(activeSiteFilter) || siteName.toLowerCase() === activeSiteFilter.toLowerCase();
    });
  }, [infrastructures, activeSiteFilter]);

  const handleOpenCreate = () => {
    setEditingInfra(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (infra) => {
    setEditingInfra(infra);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingInfra(null);
    fetchData();
  };

  return (
    <div className="flex flex-col w-full min-h-full pb-12 bg-gray-50/60">
      <HeaderAdmin />

      <div className="px-6 sm:px-8 py-6 w-full max-w-7xl mx-auto space-y-6">
        {isFormOpen ? (
          <SiteOlympiqueForm
            initialData={editingInfra}
            onCancel={() => setIsFormOpen(false)}
            onSuccess={handleFormSuccess}
          />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Sites Olympiques
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Gérez les informations des sites et infrastructures des JOJ Dakar 2026.
                </p>
              </div>
              <button
                onClick={handleOpenCreate}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition shadow-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un site</span>
              </button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveSiteFilter("all")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition shrink-0 ${
                  activeSiteFilter === "all"
                    ? "bg-[#0B7B58] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Tous les sites
              </button>
              {sites.map((site) => {
                const isActive =
                  String(activeSiteFilter) === String(site.id) ||
                  activeSiteFilter.toLowerCase() === site.nom.toLowerCase();
                return (
                  <button
                    key={site.id}
                    onClick={() => setActiveSiteFilter(site.nom)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition shrink-0 ${
                      isActive
                        ? "bg-[#0B7B58] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {site.nom}
                  </button>
                );
              })}
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="bg-white rounded-2xl p-12 text-center text-gray-400 text-sm border border-gray-100">
                  Chargement des sites et infrastructures...
                </div>
              ) : filteredInfrastructures.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center text-gray-400 text-sm border border-gray-100">
                  Aucun site ou infrastructure trouvé pour cette zone.
                </div>
              ) : (
                filteredInfrastructures.map((infra) => {
                  const disciplines = Array.isArray(infra.disciplines) ? infra.disciplines : [];
                  const siteName = infra.site?.nom || "";
                  const capaciteText = infra.capacite ? `${Number(infra.capacite).toLocaleString()} places` : "";

                  return (
                    <div
                      key={infra.id}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0px_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between gap-4 transition hover:shadow-md"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base font-bold text-gray-900">
                            {infra.nom}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {infra.description ||
                              (capaciteText ? `Infrastructure de ${capaciteText} à ${siteName}` : `Site olympique de ${siteName}`)}
                          </p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase">
                          {infra.actif ? "ACTIF" : "INACTIF"}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {disciplines.length > 0 ? (
                          disciplines.map((d, index) => (
                            <span
                              key={d.id || index}
                              className="px-3 py-1 rounded-lg bg-gray-50 text-gray-700 text-xs font-medium border border-gray-200"
                            >
                              {d.nom || d}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400">Toutes disciplines</span>
                        )}
                      </div>

                      <div className="flex justify-end items-center gap-2.5 pt-2 border-t border-gray-50">
                        <button
                          onClick={() => handleOpenEdit(infra)}
                          className="px-3.5 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-medium transition"
                        >
                          Voir détails
                        </button>
                        <button
                          onClick={() => handleOpenEdit(infra)}
                          className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDeleteInfra(infra.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold transition"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
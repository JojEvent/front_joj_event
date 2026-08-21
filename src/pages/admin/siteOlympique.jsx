import React, { useState, useEffect, useMemo } from "react";
import HeaderAdmin from "../../composants/admin/header";
import SiteOlympiqueForm from "../../composants/admin/siteOlympiqueForm";
import { instanceApi } from "../../services/api";
import { Plus, MapPin, Users, ImageOff, Edit3, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const getFullImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:")) {
    return url;
  }
  return `http://127.0.0.1:8000${url.startsWith("/") ? "" : "/"}${url}`;
};

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
      return (
        String(siteId) === String(activeSiteFilter) ||
        siteName.toLowerCase() === activeSiteFilter.toLowerCase()
      );
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
                  Sites Olympiques & Infrastructures
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Gérez les informations, photos et disciplines des sites et infrastructures des JOJ Dakar 2026.
                </p>
              </div>
              <button
                onClick={handleOpenCreate}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un site / infrastructure</span>
              </button>
            </div>

            {/* Filtres par site */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveSiteFilter("all")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition shrink-0 cursor-pointer ${
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
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition shrink-0 cursor-pointer ${
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

            {/* Liste des infrastructures */}
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
                  const siteName = infra.site?.nom || (typeof infra.site === "string" ? infra.site : "Site Olympique");
                  const capaciteText = infra.capacite ? `${Number(infra.capacite).toLocaleString()} places` : null;
                  const imageUrl = getFullImageUrl(infra.image_infrastructure);

                  return (
                    <div
                      key={infra.id}
                      className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-[0px_1px_3px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition hover:shadow-md"
                    >
                      {/* Image Thumbnail + Description */}
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200 flex items-center justify-center">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={infra.nom}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <ImageOff className="w-8 h-8 text-gray-300" />
                          )}
                        </div>

                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-bold text-gray-900 truncate">
                              {infra.nom}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                              infra.actif
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                : "bg-gray-100 text-gray-500 border border-gray-200"
                            }`}>
                              {infra.actif ? "ACTIF" : "INACTIF"}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              <MapPin className="w-3.5 h-3.5" />
                              {siteName}
                            </span>
                            {capaciteText && (
                              <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md font-medium">
                                <Users className="w-3.5 h-3.5 text-gray-500" />
                                {capaciteText}
                              </span>
                            )}
                          </div>

                          {infra.description && (
                            <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                              {infra.description}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {disciplines.length > 0 ? (
                              disciplines.map((d, index) => (
                                <span
                                  key={d.id || index}
                                  className="px-2.5 py-0.5 rounded-md bg-gray-50 text-gray-600 text-[11px] font-medium border border-gray-200"
                                >
                                  {d.nom || d}
                                </span>
                              ))
                            ) : (
                              <span className="text-[11px] text-gray-400">Aucune discipline associée</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 self-end md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 w-full md:w-auto justify-end">
                        <button
                          onClick={() => handleOpenEdit(infra)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Modifier</span>
                        </button>
                        <button
                          onClick={() => handleDeleteInfra(infra.id)}
                          className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Supprimer</span>
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
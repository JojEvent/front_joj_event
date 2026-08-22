import React, { useState, useEffect, useMemo } from "react";
import HeaderAdmin from "../../composants/admin/header";
import UserForm from "../../composants/admin/userForm";
import { useAuth } from "../../context/authContext";
import { instanceApi } from "../../services/api";
import {
  Search,
  Plus,
  RotateCw,
  Edit2,
  Lock,
  Unlock,
  Users,
  Star,
  Newspaper,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import { formatArticleDate } from "../../utils/formatDate";

const ROLE_BADGES = {
  SPECTATEUR: { label: "STANDARD", bg: "bg-blue-50 text-blue-600" },
  VIP: { label: "VIP GOLD", bg: "bg-amber-50 text-amber-700" },
  JOURNALISTE: { label: "PRESSE", bg: "bg-purple-50 text-purple-600" },
  ADMIN: { label: "ADMIN", bg: "bg-emerald-50 text-emerald-700" },
};

export default function UserGestionAdmin() {
  const { allProfiles } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatut, setSelectedStatut] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await allProfiles();
      if (res?.success && Array.isArray(res.data)) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const stats = useMemo(() => {
    const totalSpectateurs = users.filter(
      (u) => u.role === "SPECTATEUR",
    ).length;
    const totalJournalistes = users.filter(
      (u) => u.role === "JOURNALISTE",
    ).length;
    const totalVip = users.filter((u) => u.is_vip || u.role === "ADMIN").length;

    return {
      spectateurs: totalSpectateurs,
      journalistes: totalJournalistes,
      vip: totalVip,
    };
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const fullName =
        `${u.first_name || ""} ${u.last_name || ""}`.toLowerCase();
      const email = (u.email || "").toLowerCase();
      const query = search.toLowerCase();
      const matchesSearch = fullName.includes(query) || email.includes(query);

      const matchesType = selectedType === "all" || u.role === selectedType;
      const matchesStatut =
        selectedStatut === "all" ||
        (selectedStatut === "ACTIF" && u.is_verified) ||
        (selectedStatut === "INACTIF" && !u.is_verified);

      return matchesSearch && matchesType && matchesStatut;
    });
  }, [users, search, selectedType, selectedStatut]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const handleOpenCreate = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingUser(null);
    fetchUsers();
  };

  const handleToggleBlock = async (u) => {
    try {
      await instanceApi.patch("/user/profile/update/", {
        id: u.id,
        is_verified: !u.is_verified,
      });
      toast.success(
        u.is_verified
          ? "Utilisateur désactivé"
          : "Utilisateur activé avec succès",
      );
      fetchUsers();
    } catch (error) {
      toast.error("Erreur lors de la modification du statut");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-full pb-12 bg-gray-50/60">
      <HeaderAdmin />

      <div className="px-6 sm:px-8 py-6 w-full max-w-7xl mx-auto space-y-6">
        {isFormOpen ? (
          <UserForm
            initialData={editingUser}
            onCancel={() => setIsFormOpen(false)}
            onSuccess={handleFormSuccess}
          />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Gestion des Utilisateurs
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Gérez les comptes spectateurs, VIP et journalistes.
                </p>
              </div>
              <button
                onClick={handleOpenCreate}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition shadow-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter utilisateur</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0px_1px_3px_rgba(0,0,0,0.03)] flex justify-between items-start">
                <div>
                  <span className="text-xs text-gray-400 font-medium">
                    Total Spectateurs
                  </span>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {loading ? "..." : stats.spectateurs}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">
                    Spectateurs actifs
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0px_1px_3px_rgba(0,0,0,0.03)] flex justify-between items-start">
                <div>
                  <span className="text-xs text-gray-400 font-medium">
                    Comptes VIP
                  </span>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {loading ? "..." : stats.vip}
                  </div>
                  <span className="text-[11px] font-semibold text-amber-600 mt-1 block">
                    Accès premium actif
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0px_1px_3px_rgba(0,0,0,0.03)] flex justify-between items-start">
                <div>
                  <span className="text-xs text-gray-400 font-medium">
                    Journalistes Accrédités
                  </span>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {loading ? "..." : stats.journalistes}
                  </div>
                  <span className="text-[11px] font-semibold text-purple-600 mt-1 block">
                    Presse validée
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Newspaper className="w-5 h-5" />
                </div>
              </div>
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
                  placeholder="Rechercher par nom, email..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-800 placeholder-gray-400 border border-gray-200/80 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto">
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">Tous les Types</option>
                  <option value="SPECTATEUR">Standard (Spectateur)</option>
                  <option value="JOURNALISTE">Presse / Journaliste</option>
                  <option value="ADMIN">Administrateur</option>
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
                  <option value="ACTIF">Actif</option>
                  <option value="INACTIF">Inactif</option>
                </select>

                <button
                  onClick={fetchUsers}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-500 transition"
                  title="Rafraîchir"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0px_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50/75 border-b border-gray-100 text-gray-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-5">Utilisateurs</th>
                      <th className="py-3.5 px-4">Email</th>
                      <th className="py-3.5 px-4">Type</th>
                      <th className="py-3.5 px-4">Billets Actifs</th>
                      <th className="py-3.5 px-4">Date Inscription</th>
                      <th className="py-3.5 px-4">Statut</th>
                      <th className="py-3.5 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700 font-normal">
                    {loading ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-12 text-center text-gray-400 text-sm"
                        >
                          Chargement des utilisateurs...
                        </td>
                      </tr>
                    ) : paginatedUsers.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-12 text-center text-gray-400 text-sm"
                        >
                          Aucun utilisateur trouvé.
                        </td>
                      </tr>
                    ) : (
                      paginatedUsers.map((u) => {
                        const fullName =
                          u.first_name && u.last_name
                            ? `${u.first_name} ${u.last_name}`
                            : u.email?.split("@")[0] || "Utilisateur";
                        const roleInfo =
                          ROLE_BADGES[u.role] || ROLE_BADGES.SPECTATEUR;
                        const formattedDate = formatArticleDate(u.created_at);

                        return (
                          <tr
                            key={u.id}
                            className="hover:bg-gray-50/50 transition"
                          >
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0">
                                  {fullName.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-bold text-gray-900 text-sm truncate">
                                  {fullName}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-500 font-medium">
                              {u.email}
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${roleInfo.bg}`}
                              >
                                {roleInfo.label}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-600 font-medium">
                              {u.billets_count ||
                                (u.role === "JOURNALISTE"
                                  ? "1 accréditation"
                                  : "0 billet")}
                            </td>
                            <td className="py-4 px-4 text-gray-400 font-medium">
                              {formattedDate}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    u.is_verified
                                      ? "bg-emerald-500"
                                      : "bg-gray-400"
                                  }`}
                                />
                                <span
                                  className={`text-xs font-medium ${
                                    u.is_verified
                                      ? "text-emerald-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {u.is_verified ? "Actif" : "Inactif"}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-5 text-right">
                              <div className="inline-flex items-center gap-1.5 text-gray-400">
                                <button
                                  onClick={() => handleOpenEdit(u)}
                                  className="p-1.5 rounded-lg hover:bg-gray-100 hover:text-gray-800 transition"
                                  title="Modifier"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleToggleBlock(u)}
                                  className="p-1.5 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition"
                                  title="Statut accès"
                                >
                                  <Lock className="w-3.5 h-3.5" />
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

              {!loading && filteredUsers.length > 0 && (
                <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
                  <div>
                    Affichage de {paginatedUsers.length} sur{" "}
                    {filteredUsers.length} utilisateur(s)
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      Précédent
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (num) => (
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
                      ),
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
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

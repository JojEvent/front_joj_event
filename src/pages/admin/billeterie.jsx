import React, { useState, useEffect } from "react";
import HeaderAdmin from "../../composants/admin/header";
import { instanceApi } from "../../services/api";
import {
  Search,
  QrCode,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Ticket,
} from "lucide-react";
import { toast } from "react-toastify";

export default function BilleterieAdmin() {
  const [ticketInput, setTicketInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingHistory, setFetchingHistory] = useState(true);
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchTicketsHistory = async () => {
    setFetchingHistory(true);
    try {
      const response = await instanceApi.get("/billets/");
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.results || [];

      const formatted = data.map((b) => {
        const dateObj = b.date_modification || b.date_creation;
        const timeStr = dateObj
          ? new Date(dateObj).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : "—";

        let label = "Valide";
        let key = "VALIDE";
        if (b.statut === "UTILISE") {
          label = "Utilisé";
          key = "UTILISE";
        } else if (b.statut === "ANNULE") {
          label = "Annulé";
          key = "INVALIDE";
        }

        return {
          id: b.id || b.code_unique,
          numero: b.code_unique ? `#${String(b.code_unique).slice(0, 8).toUpperCase()}` : `#${b.id}`,
          spectateur:
            b.utilisateur_nom ||
            b.utilisateur_email ||
            (b.utilisateur ? `Utilisateur #${b.utilisateur}` : "Spectateur"),
          evenement: b.evenement_titre || (b.evenement ? `Événement #${b.evenement}` : "Non associé"),
          heure: timeStr,
          resultat: label,
          statutKey: key,
        };
      });

      setHistory(formatted);
    } catch (err) {
      console.error("Erreur lors de la récupération des billets:", err);
    } finally {
      setFetchingHistory(false);
    }
  };

  useEffect(() => {
    fetchTicketsHistory();
  }, []);

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    const cleanInput = ticketInput.trim();

    if (!cleanInput) {
      toast.info("Veuillez saisir un code de billet");
      return;
    }

    setLoading(true);

    const now = new Date();
    const formattedTime = now.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    try {
      const response = await instanceApi.post("/billets/valider/", {
        code_unique: cleanInput,
      });

      const billet = response.data?.billet || response.data;
      const resultObj = {
        statut: "VALIDE",
        statutLabel: "VALIDE",
        spectateur:
          billet?.utilisateur_nom ||
          billet?.utilisateur_email ||
          (billet?.utilisateur ? `Utilisateur #${billet.utilisateur}` : "Spectateur"),
        evenement: billet?.evenement_titre || (billet?.evenement ? `Événement #${billet.evenement}` : "Événement"),
        date: billet?.date_creation
          ? new Date(billet.date_creation).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "—",
        siege: billet?.siege || "Placement libre",
        type: billet?.type_billet || "STANDARD",
      };

      setCurrentResult(resultObj);
      toast.success(response.data?.message || "Billet validé avec succès !");

      setHistory((prev) => [
        {
          id: `val-${Date.now()}`,
          numero: `#${String(cleanInput).slice(0, 8).toUpperCase()}`,
          spectateur: resultObj.spectateur,
          evenement: resultObj.evenement,
          heure: formattedTime,
          resultat: "Valide",
          statutKey: "VALIDE",
        },
        ...prev.filter((item) => item.numero !== cleanInput),
      ]);
    } catch (error) {
      const errDetail =
        error.response?.data?.erreur ||
        error.response?.data?.detail ||
        (Array.isArray(error.response?.data?.non_field_errors)
          ? error.response.data.non_field_errors[0]
          : null) ||
        (Array.isArray(error.response?.data?.code_unique)
          ? error.response.data.code_unique[0]
          : null) ||
        error.message ||
        "Erreur lors de la validation";

      let statutKey = "INVALIDE";
      let statutLabel = "INVALIDE";
      let resultatText = "Invalide";

      if (
        errDetail &&
        (errDetail.toLowerCase().includes("utilisé") ||
          errDetail.toLowerCase().includes("deja"))
      ) {
        statutKey = "UTILISE";
        statutLabel = "DÉJÀ UTILISÉ";
        resultatText = "Déjà utilisé";
        toast.warning(errDetail);
      } else {
        toast.error(errDetail);
      }

      setCurrentResult({
        statut: statutKey,
        statutLabel: statutLabel,
        spectateur: "Non trouvé",
        evenement: "Non trouvé",
        date: "—",
        siege: "—",
        type: "—",
        erreurMessage: errDetail,
      });

      setHistory((prev) => [
        {
          id: `val-${Date.now()}`,
          numero: `#${String(cleanInput).slice(0, 8).toUpperCase()}`,
          spectateur: "Inconnu",
          evenement: "Billet rejeté",
          heure: formattedTime,
          resultat: resultatText,
          statutKey: statutKey,
        },
        ...prev,
      ]);
    } finally {
      setLoading(false);
      setTicketInput("");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-full pb-16 bg-[#F8FAFC]">
      <HeaderAdmin />

      <div className="px-4 sm:px-6 py-10 w-full max-w-4xl mx-auto space-y-8 animate-fadeIn">
        {/* Titre & Sous-titre centrés */}
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1528] tracking-tight">
            Vérification de Billets
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Scannez ou saisissez un numéro de billet pour vérifier sa validité
          </p>
        </div>

        {/* Barre de recherche / Scan */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/90 max-w-2xl mx-auto">
          <form onSubmit={handleVerify} className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="relative flex-1 flex items-center">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value)}
                  placeholder="Entrez le code UUID du billet"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50/70 rounded-xl border border-gray-200/80 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>

              {/* Bouton Scanner QR Code */}
              <button
                type="button"
                onClick={() =>
                  toast.info("Prêt pour la lecture QR Code")
                }
                className="p-3 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100 transition shadow-xs flex items-center justify-center"
                title="Scanner QR Code"
              >
                <QrCode className="w-5 h-5" />
              </button>

              {/* Bouton Vérifier */}
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-[#009b62] hover:bg-[#008753] disabled:opacity-50 text-white font-bold text-sm shadow-xs transition flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Vérifier"
                )}
              </button>
            </div>

            <p className="text-[11px] text-gray-400 text-center font-medium">
              Vous pouvez aussi scanner le QR code du billet
            </p>
          </form>
        </div>

        {/* Carte Résultat */}
        {currentResult && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/90 max-w-2xl mx-auto space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Résultat</h2>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  currentResult.statut === "VALIDE"
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : currentResult.statut === "UTILISE"
                    ? "bg-purple-50 text-purple-600 border border-purple-100"
                    : "bg-rose-50 text-rose-600 border border-rose-100"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    currentResult.statut === "VALIDE"
                      ? "bg-emerald-500"
                      : currentResult.statut === "UTILISE"
                      ? "bg-purple-500"
                      : "bg-rose-500"
                  }`}
                />
                <span>{currentResult.statutLabel}</span>
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">
                  Spectateur
                </span>
                <span className="font-bold text-gray-900">
                  {currentResult.spectateur}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">
                  Événement
                </span>
                <span className="font-bold text-gray-900">
                  {currentResult.evenement}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">
                  Date
                </span>
                <span className="font-bold text-gray-900">
                  {currentResult.date}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">
                  Siège / Zone
                </span>
                <span className="font-bold text-gray-900">
                  {currentResult.siege}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">
                  Type
                </span>
                <span className="font-bold text-gray-900">
                  {currentResult.type}
                </span>
              </div>

              {currentResult.erreurMessage && (
                <div className="pt-2 border-t border-gray-100 text-xs text-rose-500 font-medium">
                  {currentResult.erreurMessage}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Historique des vérifications */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Historique des vérifications
            </h2>
            <button
              onClick={fetchTicketsHistory}
              disabled={fetchingHistory}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Actualiser
            </button>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/90">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/40 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="py-3.5 px-6">N° BILLET</th>
                    <th className="py-3.5 px-6">SPECTATEUR</th>
                    <th className="py-3.5 px-6">ÉVÉNEMENT</th>
                    <th className="py-3.5 px-6 text-center">HEURE</th>
                    <th className="py-3.5 px-6 text-right">RÉSULTAT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {fetchingHistory ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-8 text-center text-gray-400 text-xs"
                      >
                        <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1 text-emerald-500" />
                        Chargement de l'historique...
                      </td>
                    </tr>
                  ) : history.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-8 text-center text-gray-400 text-xs"
                      >
                        Aucun billet vérifié pour le moment.
                      </td>
                    </tr>
                  ) : (
                    history.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50/50 transition font-medium"
                      >
                        <td className="py-4 px-6 text-gray-500 font-mono font-bold">
                          {item.numero}
                        </td>
                        <td className="py-4 px-6 font-bold text-gray-900">
                          {item.spectateur}
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          {item.evenement}
                        </td>
                        <td className="py-4 px-6 text-center text-gray-500 font-mono">
                          {item.heure}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${
                              item.statutKey === "VALIDE"
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                : item.statutKey === "UTILISE"
                                ? "bg-purple-50 text-purple-600 border border-purple-100"
                                : "bg-rose-50 text-rose-600 border border-rose-100"
                            }`}
                          >
                            {item.resultat}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { Download, Share2 } from "lucide-react";
import { toast } from "react-toastify";

/**
 * Composant de boutons d'action du billet (Téléchargement & Partage).
 * Principe de Responsabilité Unique : Gérer les interactions utilisateur sur le billet.
 */
export default function TicketActions({ onDownload, onShare }) {
  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      toast.info("Téléchargement du billet en cours...");
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      toast.info("Lien du billet copié dans le presse-papier !");
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-[420px] pt-2">
      <button
        type="button"
        onClick={handleDownload}
        className="flex-1 min-w-[160px] h-11 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow transition-colors cursor-pointer"
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>Télécharger le billet</span>
      </button>

      <button
        type="button"
        onClick={handleShare}
        className="flex-1 min-w-[160px] h-11 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow transition-colors cursor-pointer"
      >
        <Share2 className="w-4 h-4 shrink-0" />
        <span>Partager le billet</span>
      </button>
    </div>
  );
}

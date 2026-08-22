import React from "react";
import EventImage from "../../assets/basket.png";

/**
 * Composant d'affichage de la carte numérique du Billet (Ticket Virtuel).
 * Principe de Responsabilité Unique : Afficher le billet virtuel avec QR code et informations de réservation.
 */
export default function TicketDigitalCard({
  eventTitle = "Événement JOJ Dakar 2026",
  quantity = 1,
  section = "STANDARD",
  seats = "Place réservée",
  date = "Dakar 2026",
  time = "18h00",
  image = EventImage,
  qrCodeUrl = null,
}) {
  return (
    <div
      id="billet-a-imprimer"
      className="w-full max-w-[420px] rounded-3xl overflow-hidden bg-zinc-900 text-white shadow-2xl relative flex flex-col items-center print-billet-seul"
    >
      {/* En-tête avec Image de fond et titre */}
      <div className="relative w-full h-56 flex flex-col justify-between p-6 overflow-hidden">
        {/* Image d'arrière-plan claire et visible */}
        <img
          src={image}
          alt={eventTitle}
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-zinc-900/90" />

        <div className="relative z-10 text-center flex flex-col items-center gap-1">
          <h3 className="text-xl font-bold font-['Olympic_Headline'] tracking-wide">
            Téléchargez vos billets !
          </h3>
          <p className="text-sm font-medium text-slate-200">
            {eventTitle}
          </p>
        </div>
      </div>

      {/* Ligne perforée de séparation avec encoches latérales (Design Billet) */}
      <div className="relative w-full flex items-center justify-between px-0 -my-3 z-20">
        <div className="w-6 h-6 rounded-full bg-white -ml-3" />
        <div className="flex-1 border-t-2 border-dashed border-zinc-600 mx-2" />
        <div className="w-6 h-6 rounded-full bg-white -mr-3" />
      </div>

      {/* Corps du billet : Vrai QR Code généré par l'API backend */}
      <div className="w-full p-6 pt-8 bg-zinc-900 flex flex-col items-center gap-6">
        <div className="w-36 h-36 bg-white p-2 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden">
          {qrCodeUrl ? (
            <img
              src={qrCodeUrl}
              alt="QR Code Billet"
              className="w-full h-full object-contain"
            />
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-zinc-900"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M3 3h6v6H3V3zm12 0h6v6h-6V3zm0 12h6v6h-6v-6zM3 15h6v6H3v-6z"
                fill="currentColor"
              />
              <path d="M5 5h2v2H5V5zm12 0h2v2h-2V5zm0 12h2v2h-2v-2zM5 17h2v2H5v-2zM10 3h4v2h-4V3zm0 6h2v2h-2V9zm0 6h4v2h-4v-2zm6-6h2v4h-2V9zm-6 6v4h2v-4h-2z" />
            </svg>
          )}
        </div>

        {/* Grille d'informations de réservation */}
        <div className="w-full grid grid-cols-2 gap-x-6 gap-y-3 pt-2 text-sm">
          <div>
            <span className="block text-zinc-400 text-xs">Quantité</span>
            <span className="font-bold text-white text-base">{quantity} Billets</span>
          </div>
          <div>
            <span className="block text-zinc-400 text-xs">Siège</span>
            <span className="font-bold text-white text-base">{seats}</span>
          </div>

          <div>
            <span className="block text-zinc-400 text-xs">Section</span>
            <span className="font-bold text-white text-base">{section}</span>
          </div>
          <div>
            <span className="block text-zinc-400 text-xs">Heure</span>
            <span className="font-bold text-white text-base">{time}</span>
          </div>

          <div>
            <span className="block text-zinc-400 text-xs">Date</span>
            <span className="font-bold text-white text-base">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

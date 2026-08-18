// composants/eventDetail/SectionTitle.jsx
// Réutilisé pour "À propos", "Programme des combats", "Informations sur les lieux"

export default function SectionTitle({ children, color = "bg-red-600" }) {
  return (
    <div className="self-stretch flex justify-start items-center gap-4">
      <div className={`w-2 h-8 rounded-full ${color}`} />
      <h2 className="text-zinc-900 text-3xl font-bold font-['Olympic_Sans_Bold'] leading-9">
        {children}
      </h2>
    </div>
  );
}

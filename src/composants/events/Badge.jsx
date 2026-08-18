// components/ui/Badge.jsx
// Petit composant de pastille réutilisé pour : le tag sport (NATATION...),
// le tag médaille/statut (FINALES, DISPONIBLE...) et le chip "SEMIS".

export default function Badge({ label, color = "bg-zinc-900", textColor = "text-white", outline = false }) {
  return (
    <div
      className={[
        "px-4 py-1.5 rounded-full inline-flex justify-center items-center",
        color,
        outline ? "outline outline-1 outline-offset-[-1px] outline-gray-100 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" : "",
      ].join(" ")}
    >
      <span className={`text-xs font-bold font-['Olympic_Sans_Bold'] uppercase leading-4 tracking-wider ${textColor}`}>
        {label}
      </span>
    </div>
  );
}
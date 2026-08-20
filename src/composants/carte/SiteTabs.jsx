// composants/carte/SiteTabs.jsx
export default function SiteTabs({ sites, activeSiteId, onChange }) {
  if (!sites || sites.length === 0) return null;

  return (
    <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-neutral-100 rounded-full">
      {sites.map((site) => {
        const isActive = site.id === activeSiteId;
        return (
          <button
            key={site.id}
            type="button"
            onClick={() => onChange(site.id)}
            className={[
              "px-4 py-2 rounded-full text-sm font-olympic-medium capitalize transition-colors cursor-pointer",
              isActive
                ? "bg-white text-green-600 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700",
            ].join(" ")}
          >
            {site.nom}
          </button>
        );
      })}
    </div>
  );
}

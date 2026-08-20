// composants/carte/InfrastructureList.jsx
import SiteTabs from "./SiteTabs";
import InfrastructureCard from "./InfrastructureCard";

export default function InfrastructureList({
  sites,
  activeSiteId,
  onChangeSite,
  infrastructures,
  selectedInfrastructureId,
  onSuivreItineraire,
}) {
  return (
    <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-5">
      <div>
        <h2 className="text-black text-xl font-olympic-medium mb-4">Explore Hubs</h2>
        <SiteTabs sites={sites} activeSiteId={activeSiteId} onChange={onChangeSite} />
      </div>

      <div className="flex flex-col gap-4 max-h-[560px] overflow-y-auto pr-1">
        {infrastructures.length === 0 ? (
          <p className="text-neutral-400 text-sm font-olympic py-6 text-center">
            Aucune infrastructure renseignée pour ce site pour le moment.
          </p>
        ) : (
          infrastructures.map((infrastructure, index) => (
            <InfrastructureCard
              key={infrastructure.id}
              infrastructure={infrastructure}
              hubNumber={index + 1}
              isSelected={infrastructure.id === selectedInfrastructureId}
              onSuivreItineraire={onSuivreItineraire}
            />
          ))
        )}
      </div>
    </div>
  );
}

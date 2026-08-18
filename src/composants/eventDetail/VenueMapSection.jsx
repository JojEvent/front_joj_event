import SectionTitle from "./SectionTitle";
import VenueMap from "./VenueMap";

export default function VenueMapSection({
  location,
  latitude,
  longitude,
  onDiscoverMap,
}) {
  return (
    <section className="self-stretch flex flex-col justify-start items-start gap-8">

      <SectionTitle color="bg-green-700">
        Informations sur les lieux
      </SectionTitle>

      <div className="self-stretch rounded-3xl outline outline-1 outline-offset-[-1px] outline-gray-200 overflow-hidden">

        {/* Carte */}
        <VenueMap
          latitude={latitude}
          longitude={longitude}
          location={location}
        />

        {/* Informations 
        <div className="px-6 py-4 bg-white">
          <div className="flex flex-col gap-1">

            <span className="text-zinc-900 text-lg font-bold font-['Olympic_Sans_Bold']">
              {location}
            </span>

            {address && (
              <span className="text-stone-500 text-sm font-normal font-['Olympic_Sans']">
                {address}
              </span>
            )}

          </div>

          <button
            type="button"
            onClick={onDiscoverMap}
            className="mt-3 px-6 py-2.5 bg-Primaire rounded-xl text-white text-sm font-bold font-['Olympic_Sans_Bold']"
          >
            Découvrir la carte
          </button>
        </div>*/}
        

      </div>
    </section>
  );
}
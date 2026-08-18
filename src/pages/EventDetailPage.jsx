// pages/EventDetailPage.jsx
import BackLink from "../composants/eventDetail/BackLink";
import HeroSection from "../composants/eventDetail/HeroSection";
import AboutSection from "../composants/eventDetail/AboutSection";
import ScheduleSection from "../composants/eventDetail/ScheduleSection";
import VenueMapSection from "../composants/eventDetail/VenueMapSection";
import RelatedEventsSection from "../composants/eventDetail/RelatedEventsSection";
import TicketCard from "../composants/eventDetail/TicketCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEventById } from "../hooks/Useeventdetail";
import { useEvents } from "../hooks/Usevents";

export default function EventDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useEventById(id);
  console.log("je suis la",data);
  const { events } = useEvents();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };
  
  const handleAddToCart = (ticketType) => {
    // TODO: appeler l'API panier (backend_joj_event)
    console.log("Ajout au panier :", ticketType ?? "type par défaut");
  };

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (isError) {
    return <p>Erreur lors du chargement de l'événement.</p>;
  }

  return (
    <div className="w-full bg-white flex flex-col justify-start items-center">
      

      <div className="w-full max-w-[1200px] flex flex-col justify-start items-center">
        <div className="self-stretch">
          <BackLink onClick={handleClick} />
        </div>

        <div className="self-stretch pb-12">
          <HeroSection event={data} />
        </div>

        <div className="self-stretch pb-24 flex justify-start items-start gap-12">
          {/* Colonne principale */}
          <div className="flex-1 self-stretch flex flex-col justify-start items-start gap-16">
            <AboutSection event={data} />
            <ScheduleSection schedule={data.programmes} />
            <VenueMapSection
                location={data.infrastructure.nom}
                latitude={14.7167}
                longitude={-17.1961}
                onDiscoverMap={() => console.log("Ouvrir la carte complète")}
            />
            <RelatedEventsSection events={events.slice(0, 2)} />
          </div>

          {/* Sidebar billetterie */}
          <div className="w-96 self-stretch">
            <div className="sticky top-8">
              <TicketCard event={data} onAddToCart={handleAddToCart} />
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

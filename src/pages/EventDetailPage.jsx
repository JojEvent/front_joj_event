// pages/EventDetailPage.jsx
import Header from "../composants/header";
import Footer from "../composants/footer";
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
  const { events = [] } = useEvents();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/evenements`);
  };

  const handleAddToCart = (ticketType) => {
    console.log("Ajout au panier :", ticketType ?? "type par défaut");
    navigate("/panier");
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col justify-between items-center">
        <Header />
        <p className="py-24 text-stone-500">Chargement de l'événement...</p>
        <Footer />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col justify-between items-center">
        <Header />
        <div className="py-24 flex flex-col items-center gap-4">
          <p className="text-red-600 font-bold">Erreur lors du chargement de l'événement.</p>
          <button
            onClick={() => navigate("/evenements")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Retour aux événements
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between items-center">
      <Header />

      <main className="w-full flex-1 flex flex-col items-center">
        <div className="w-full max-w-[1200px] flex flex-col justify-start items-center px-4">
          <div className="self-stretch">
            <BackLink onClick={handleClick} />
          </div>

          <div className="self-stretch pb-12">
            <HeroSection event={data} />
          </div>

          <div className="self-stretch pb-24 flex flex-col lg:flex-row justify-start items-start gap-12">
            {/* Colonne principale */}
            <div className="flex-1 self-stretch flex flex-col justify-start items-start gap-16">
              <AboutSection event={data} />
              <ScheduleSection schedule={data.programmes} />
              <VenueMapSection
                location={data.infrastructure?.nom || "Site Olympique"}
                latitude={14.7167}
                longitude={-17.1961}
                onDiscoverMap={() => console.log("Ouvrir la carte complète")}
              />
              <RelatedEventsSection events={(events || []).slice(0, 2)} />
            </div>

            {/* Sidebar billetterie */}
            <div className="w-full lg:w-96 self-stretch">
              <div className="sticky top-24">
                <TicketCard event={data} onAddToCart={handleAddToCart} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

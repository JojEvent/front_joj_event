import React from "react";
import { ArrowRight } from "lucide-react";
import Header from "../composants/header";
import Footer from "../composants/footer";
import SportIcon from "../composants/SportIcon";
import EventCard from "../composants/EventCard";
import StepCard from "../composants/StepCard";
import RecentResult from "../composants/RecentResult";
import JournalArticle from "../composants/JournalArticle";

// Images du hero (dossier assets)
import MascotteLion from "../assets/mascotte.gif";
import MonumentBg from "../assets/monument.png";
import AthleteImg from "../assets/basket.png";
import assistant from "../assets/assistantIA.png";
import etape1 from "../assets/etape1.png";
import etape2 from "../assets/etape2.png";
import etape3 from "../assets/etape3.png";
import event_judo from "../assets/event_judo.png";
import article1 from "../assets/article1.png";
import article2 from "../assets/article2.png";
import article3 from "../assets/article3.png";
import article4 from "../assets/article4.png";

// Icônes billetterie : placeholders Figma (63x50, 63x47, 64x48)
const ticketSteps = [
  {
    icon: etape1,
    title: "Choisir un événement",
    description: "Sélectionnez le sport, la date et le lieu",
  },
  {
    icon: etape2,
    title: "Réserver votre billet",
    description: "Choisissez votre catégorie (Standard, VIP…)",
  },
  {
    icon: etape3,
    title: "Effectuer le paiement",
    description: "Réalisez un paiement rapide et sécurisé",
  },
];

// Filtres événements (Figma)
const eventFilters = ["Aujourd'hui", "Tous", "Pour vous", "Weekend"];

// 6 événements — ordre Figma (3 colonnes × 2 lignes)
const events = [
  {
    title: "Judo - Demi-finales Hommes",
    date: "Assis. 1er novembre, 07h00",
    location: "Arène de Diamniadio",
    price: "A partir de 15.000 FCFA",
    image: event_judo,
    tags: [
      { label: "JUDO", color: "#0369a1" },
      { label: "SEMIS", color: "#ffffff", textColor: "#27272a" },
    ],
  },
  {
    title: "Finale du 100 m nage libre",
    date: "Soleil. 2 novembre, 10h00",
    location: "Centre Aquatique Dakar",
    price: "À partir de 10.000 FCFA",
    image: event_judo,
    tags: [
      { label: "NATATION", color: "#15803d" },
      { label: "MÉDAILLE D'OR", color: "#ca8a04" },
    ],
  },
  {
    title: "Qualifications des haies",
    date: "Lun. 3 novembre, 16h30",
    location: "Stade Léopold Sédar Senghor",
    price: "À partir de 5.000 FCFA",
    image: event_judo,
    tags: [{ label: "ATHLÉTISME", color: "#dc2626" }],
  },
  {
    title: "Basket 3x3 - Série Finale",
    date: "Mar. 4 novembre, 19h00",
    location: "Place de la Nation",
    price: "A partir de 12.000 FCFA",
    image: event_judo,
    tags: [
      { label: "BASKET-BALL 3x3", color: "#ca8a04" },
      { label: "FINALES", color: "#27272a" },
    ],
  },
  {
    title: "Gymnastique Artistique",
    date: "Mercredi. 5 novembre, 09h00",
    location: "Palais des Sports de Diamniadio",
    price: "A partir de 8.000 FCFA",
    image: event_judo,
    tags: [{ label: "GYMNASTIQUE", color: "#0284c7" }],
  },
  {
    title: "Escrime individuelle hommes",
    date: "Jeu. 6 novembre, 14h00",
    location: "Arène Nationale de Lutte",
    price: "À partir de 7.500 FCFA",
    image: event_judo,
    tags: [
      { label: "ESCRIME", color: "#78716c" },
      { label: "DISPONIBLE", color: "#15803d" },
    ],
  },
];

// Classement médailles — drapeau Sénégal répété (Figma)
const classementRows = [1, 2, 3, 4];

// Résultats récents (colonne de droite)
const recentResults = [
  {
    iconType: "football",
    title: "Demie Finale : Sénégal - France",
    subtitle: "Football",
    description: "Résultat : 3 - 0",
  },
  {
    iconType: "athletisme",
    title: "Vainqueur : Mohamed Gueye",
    subtitle: "Athlétisme - 100 m",
    description: "Classement actuel, chronos et tendance des athlètes.",
  },
  {
    iconType: "basket",
    title: "Sénégal - France",
    subtitle: "Basket",
    description: "Classement actuel, chronos et tendance des athlètes.",
  },
];

// Articles du journal olympique (colonne de gauche)
const journalArticles = [
  {
    image: article1,
    date: "100m - 03 June 2026",
    title: "Les sprinteuses sont au rendez-vous",
    description: "Le record du 100m est descendu de 1s",
  },
  {
    image: article2,
    date: "Football - 03 June 2026",
    title: "Le Senegal face a son destin",
    description: "Le Senegal est a un match de la courone",
  },
  {
    image: article3,
    date: "Natation - 03 June 2026",
    title: "Les nageurs sont prêts à nager sur Saly",
    description: "Le record au viseur",
  },
];

// 4 sports sous le hero (Figma)
const sports = [
  { type: "football", name: "Football", location: "Dakar" },
  { type: "athletisme", name: "Athlétisme – 100m", location: "Diamniadio" },
  { type: "basket", name: "Basket", location: "Saly" },
  { type: "judo", name: "Judo", location: "Dakar" },
];

// Drapeau Sénégal pour le tableau classement
const FlagSenegal = () => (
  <div className="w-7 h-5 relative">
    <div className="absolute inset-0 bg-white rounded-sm shadow-[0px_1px_1px_0px_rgba(0,0,0,0.16)]" />
    <div className="absolute left-0 top-0 w-2.5 h-5 bg-neutral-800" />
    <div className="absolute left-[9.33px] top-0 w-2.5 h-5 bg-red-600" />
    <div className="absolute left-[13.33px] top-0 w-3.5 h-5 bg-green-600" />
  </div>
);

// ============================================================
// PAGE D'ACCUEIL — design Figma (node 77-4)
// ============================================================
const Acceuil = () => {
  return (
    <div className="w-full bg-white overflow-x-hidden">
      <Header />

      <main className="w-full max-w-[1440px] mx-auto">

        {/* ======================================================
            SECTION 1 : HERO + SPORTS 
            ====================================================== */}
        <section className="w-full max-w-[1440px] mx-auto px-[3px] py-14 flex flex-col items-center gap-14">

          {/* --- Bloc principal du hero --- */}
          <div className="w-full max-w-[1220px] min-h-[623px] flex flex-col lg:flex-row items-center lg:items-stretch">

            {/* Colonne texte (gauche) — largeur fixe Figma */}
            <div className="translate-y-17">

              {/* Badge orange "JOJ DAKAR 2026" */}
              <div className="px-2 py-3 flex items-center gap-[5px]">
                <div className="w-9 h-px bg-amber-400" />
                <span className="text-amber-400 text-sm font-bold font-olympic-headline leading-5">
                  JOJ DAKAR 2026
                </span>
              </div>

              {/* Titres principaux */}
              <div className="px-2 py-2">
                <h1 className="text-gray-900 text-5xl sm:text-6xl lg:text-7xl font-bold font-olympic-headline leading-tight">
                  DAKAR 2026
                </h1>
                <h2 className="text-gray-900 text-2xl sm:text-3xl lg:text-4xl font-bold font-olympic-headline leading-tight mt-1">
                  Vibrez au rythme des JOJ
                </h2>
              </div>

              {/* Bouton vert */}
              <div className="w-full max-w-80 px-2 py-3">
                <button className="w-full h-12 lg:h-14 px-5 bg-secondary rounded-[10px] flex justify-center items-center gap-2 hover:bg-green-700 cursor-pointer transition-colors">
                  <span className="text-white text-base lg:text-lg font-bold">
                    Explorer les événements
                  </span>
                  <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 text-white shrink-0" />
                </button>
              </div>

              {/* Texte descriptif */}
              <div className="px-2 py-2">
                <p className="w-full max-w-80 text-neutral-500 text-sm sm:text-base lg:text-lg font-bold leading-relaxed">
                  Découvrez les événements, lieux et billets en quelques clics
                </p>
              </div>
            </div>

            {/* Colonne images (droite) — overflow visible pour l'athlète */}
            <div className="relative w-full lg:flex-1 min-h-[400px] lg:min-h-[581px] mt-8 lg:mt-0 overflow-visible">

              {/* 1. Monument en arrière-plan */}
             <img
                className="absolute left-1/2 lg:left-[-80px] top-[-80px] lg:top-[-177px] -translate-x-1/2 lg:translate-x-0 w-[600px] lg:w-[993px] h-auto lg:h-[732px] opacity-100 mix-blend-luminosity object-contain pointer-events-none z-0"
                src={MonumentBg}
                alt="Monument de l'African Renaissance en arrière-plan"
              />
              {/* 2. Mascotte lion (image principale) */}
              <img
                className="relative lg:absolute lg:left-[-50px] lg:top-[-200px] mx-auto lg:mx-0 block w-[430px] sm:w-[560px] lg:w-[800px] h-auto lg:h-[840px] object-contain z-10"
                src={MascotteLion}
                alt="Mascotte lion des JOJ Dakar 2026"
              />

              {/* 3. Athlète à droite (position corrigée : visible dans la zone) */}
              <img
                className="absolute right-8 lg:right-10 bottom-36 lg:bottom-74 w-40 sm:w-52 lg:w-72 lg:h-72 object-contain z-20"
                src={AthleteImg}
                alt="Athlète en action"
              />

              {/* 4. Petite mascotte en bas à droite */}
              <img
                className="absolute right-0 bottom-0 w-32 sm:w-48 lg:bottom-45 lg:w-64 lg:h-52 object-contain z-30 hidden sm:block lg:left-165"
                src={assistant}
                alt="Mascotte JOJ"
              />
            </div>
          </div>

          {/* --- 4 sports sous le hero (Figma) --- */}
          <div className="w-full max-w-[1220px] h-52 flex justify-center items-center gap-10">
            <div className="flex-1 flex justify-start items-center gap-10">
              {sports.map((sport) => (
                <div
                  key={sport.type}
                  className="flex-1 py-3 flex flex-col items-center gap-5 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <SportIcon type={sport.type} />
                  <div className="text-center">
                    <p className="text-black text-lg font-olympic leading-6">{sport.name}</p>
                    <p className="text-black/50 text-sm font-olympic leading-5">{sport.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ligne de séparation */}
          <div className="w-full max-w-[1434px] border-t border-black/10" />
        </section>

        {/* ======================================================
            SECTION 2 : BILLETTERIE 
            ====================================================== */}
        <section className="w-full max-w-[1220px] mx-auto px-6 py-14">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">

            {/* Colonne gauche — titre en haut, bouton en bas (justify-between) */}
            <div className="w-full lg:w-[380px] shrink-0 flex flex-col justify-start items-start gap-3 lg:gap-5 lg:h-52">
              <h2 className="text-neutral-800 text-lg sm:text-xl lg:text-2xl font-bold font-olympic-headline uppercase leading-tight max-w-[320px]">
                Achetez votre billet en 3 étapes simples !
              </h2>

              <button className="px-6 py-2.5 bg-sky-600 rounded-full inline-flex items-center gap-2 hover:bg-sky-700 cursor-pointer transition-colors">
                <span className="text-white text-sm font-bold font-olympic-headline uppercase tracking-wide">
                  J'achète mon billet
                </span>
                <ArrowRight className="h-4 w-4 text-white shrink-0" />
              </button>
            </div>

            {/* Colonne droite — 3 étapes centrées, alignées en haut avec le titre */}
            <div className="w-full lg:flex-1 lg:pl-4">
              <div className="w-full max-w-[798px] mx-auto lg:mx-0 lg:ml-[30px] grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-5">
                {ticketSteps.map((step) => (
                  <StepCard
                    key={step.title}
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            SECTION 3 : ÉVÉNEMENTS 
            ====================================================== */}
        <section className="w-full max-w-[1220px] mx-auto px-6 py-14">
          
          {/* En-tête */}
          <div className="w-full flex flex-col gap-5">
            <h2 className="text-black text-3xl lg:text-4xl font-bold font-olympic-headline">
              Parcourez les événements à Dakar
            </h2>

            {/* Filtres Figma */}
            <div className="flex flex-wrap gap-3">
              {eventFilters.map((tab) => (
                <button
                  key={tab}
                  className={`min-w-20 max-w-28 p-2 rounded-md flex flex-col items-center gap-1 text-sm font-bold font-olympic cursor-pointer ${
                    tab === "Aujourd'hui"
                      ? "text-sky-600 border-b-2 border-sky-600"
                      : "text-black hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Grille 3 colonnes × 2 lignes */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mt-10">
            {events.map((event) => (
              <div
                key={event.title}
                className="cursor-pointer hover:opacity-90 transition-opacity"
              >
                <EventCard {...event} />
              </div>
            ))}
          </div>

          {/* Bouton */}
          <div className="flex justify-center mt-10">
            <button className="px-3 py-2 bg-primaire rounded-lg hover:bg-sky-700 cursor-pointer transition-colors">
              <span className="text-neutral-100 text-base font-bold font-olympic-headline">
                Voir Plus
              </span>
            </button>
          </div>

        </section>

        {/* Ligne de séparation */}
        <div className="max-w-[1220px] mx-auto border-t border-black/10" />

        {/* ======================================================
            SECTION 4 : DERNIERS RÉSULTATS
            ====================================================== */}
        <section className="w-full max-w-[1220px] mx-auto px-6 py-14">
          <div className="flex flex-col gap-10">
          <h2 className="text-black text-3xl lg:text-4xl font-bold font-olympic-headline">
            Derniers Résultats
          </h2>

          <div className="flex flex-col lg:flex-row gap-14">

            {/* Tableau classement avec drapeaux (Figma) */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-center py-2.5">
                <span className="text-black text-xl font-bold font-olympic capitalize">Classement</span>
                <button className="text-zinc-900 text-sm font-olympic hover:text-sky-600 cursor-pointer">Voir plus</button>
              </div>

              <div className="border-t border-black/10" />

              <div className="grid grid-cols-5 items-center text-neutral-700 text-base font-medium font-olympic py-2">
                <span>Pays</span>
                <span className="text-center">🥇</span>
                <span className="text-center">🥈</span>
                <span className="text-center">🥉</span>
                <span className="text-center">Total</span>
              </div>

              {classementRows.map((row) => (
                <div
                  key={row}
                  className="grid grid-cols-5 items-center py-3 border-t border-black/5"
                >
                  <FlagSenegal />
                  <span className="text-center text-neutral-700 font-bold">16</span>
                  <span className="text-center text-neutral-700 font-bold">32</span>
                  <span className="text-center text-neutral-700 font-bold">12</span>
                  <span className="text-center text-neutral-700 font-bold">60</span>
                </div>
              ))}
            </div>

            {/* Résultats récents */}
            <div className="w-full lg:w-[612px] flex flex-col gap-5">
              <div className="flex justify-between items-center p-2.5">
                <span className="text-black text-xl font-bold capitalize">Résultats Récents</span>
                <button className="text-zinc-900 text-sm font-bold font-olympic hover:text-sky-600 cursor-pointer">Voir plus</button>
              </div>

              {recentResults.map((result) => (
                <RecentResult
                  key={result.title}
                  icon={<SportIcon type={result.iconType} className="w-16 h-16 p-2" />}
                  title={result.title}
                  subtitle={result.subtitle}
                  description={result.description}
                />
              ))}
            </div>
          </div>
          </div>
        </section>

        {/* Ligne de séparation */}
        <div className="max-w-[1220px] mx-auto border-t border-black/10" />


        {/* ======================================================
            SECTION 5 : JOURNAL OLYMPIQUE 
            ====================================================== */}
        <section className="w-full max-w-[1220px] mx-auto px-6 py-14">
          <div className="flex flex-col gap-10">
          <h2 className="text-black text-3xl lg:text-4xl font-bold font-olympic-headline">
            Journal Olympique
          </h2>

          <div className="flex flex-col lg:flex-row justify-between gap-6">

            {/* 3 articles à gauche */}
            <div className="w-full lg:w-[519px] flex flex-col gap-2.5">
              {journalArticles.map((article) => (
                <JournalArticle
                  key={article.title}
                  image={article.image}
                  date={article.date}
                  title={article.title}
                  description={article.description}
                />
              ))}
            </div>

            {/* Article vedette cyclisme (Figma) */}
            <div className="w-full lg:w-[570px] h-[400px] lg:h-[609px] relative rounded-md overflow-hidden cursor-pointer">
              <img
                className="w-full h-full object-cover absolute inset-0"
                src={article4}
                alt="Cyclisme sur piste"
              />
              <div className="absolute inset-0 bg-black/60 rounded-md" />
              <div className="relative z-10 h-full flex flex-col justify-between p-6 lg:p-8 text-white">
                <span className="w-fit px-6 py-2 rounded border border-gray-100 text-gray-100 text-xl font-medium capitalize">
                  Cycling
                </span>
                <div className="flex flex-col gap-3.5">
                  <span className="text-white text-lg font-normal leading-5">10 km - 03 June 2023</span>
                  <h3 className="text-white text-2xl lg:text-3xl font-bold font-olympic-headline capitalize">
                    Découvrez le cyclisme sur piste
                  </h3>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Acceuil;

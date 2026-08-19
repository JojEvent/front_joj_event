import React from "react";
import Header from "../composants/header";
import Footer from "../composants/footer";

// Composants de la page Résultats
import ResultatsHero from "../composants/resultats/ResultatsHero";
import ApercuMatchDirect from "../composants/resultats/ApercuMatchDirect";
import TableauMedaillesDirect from "../composants/resultats/TableauMedaillesDirect";
import FluxActualitesDirect from "../composants/resultats/FluxActualitesDirect";

/**
 * Page PageResultats
 * Reprend fidèlement l'ensemble de la maquette Figma JOJEVENT Dakar 2026 (node 414-2537)
 * avec un code clair, modulaire et structuré.
 */
const PageResultats = () => {
  // Données du match vedette en direct
  const matchEnDirect = {
    discipline: "Football Garçons u18",
    phase: "PHASE FINALE",
    categorie: "DEMI-FINALE",
    equipeDomicile: "Sénégal u18",
    equipeExterieur: "Maroc u18",
    scoreDomicile: 4,
    scoreExterieur: 0,
    tempsJoue: "76'",
    heureLocale: "Aujourd'hui, 16h30",
    lieuMatch: "Stade Abdoulaye Wade Dakar, Sénégal",
    affluenceMatch: "12 450 spectateurs",
  };

  // Données du tableau des médailles en direct
  const listeMedailles = [
    { rang: 1, pays: "Sénégal", drapeau: "🇸🇳", or: 32, argent: 32, bronze: 32, total: 96 },
    { rang: 2, pays: "France", drapeau: "🇫🇷", or: 30, argent: 32, bronze: 32, total: 96 },
    { rang: 3, pays: "USA", drapeau: "🇺🇸", or: 22, argent: 32, bronze: 32, total: 96 },
    { rang: 4, pays: "Nigéria", drapeau: "🇳🇬", or: 12, argent: 32, bronze: 32, total: 96 },
  ];

  // Données du flux d'actualités en direct
  const listeActualites = [
    {
      id: 1,
      heure: "10:30",
      tag: "BUT !",
      titre: "Sénégal U18 marque un second but décisif !",
      description: "2 - 1 vs Maroc U18",
      discipline: "Football",
      lieu: "Stade Abdoulaye Wade",
    },
    {
      id: 2,
      heure: "10:22",
      tag: "NOUVEAU RECORD !",
      titre: "Nouveau Record !",
      description: "48.2s - 100m Nage libre Papaye Ndiaye (SEN)",
      discipline: "Natation",
      lieu: "Piscine Olympique Dakar",
    },
    {
      id: 3,
      heure: "10:15",
      tag: "FIN D'ÉPREUVE",
      titre: "Course terminée",
      description: "Final Hommes - 200m 1. M. Diallo",
      discipline: "Athlétisme",
      lieu: "Stade Léopold Sédar Senghor",
    },
    {
      id: 4,
      heure: "10:05",
      tag: "MISE À JOUR",
      titre: "Changement d'horaire",
      description: "Basketball Filles U10 (Décalé à 16h)",
      discipline: "Basket",
      lieu: "Stade de Dakar",
    },
    {
      id: 5,
      heure: "10:02",
      tag: "NOUVEAU RECORD",
      titre: "Record battu !",
      description: "Épaulé - jeté - 87kg",
      discipline: "Haltérophilie",
      lieu: "Centre Handisport",
    },
  ];

  return (
    <div className="w-full bg-white text-black min-h-screen flex flex-col justify-between">
      
      {/* En-tête de navigation */}
      <Header />

      {/* Contenu principal de la page résultats */}
      <main className="w-full flex flex-col gap-14 sm:gap-20 pb-16">
        
        {/* Section 1 : Titre Hero & Bouton */}
        <ResultatsHero />

        {/* Section 2 : Aperçu du Match en Direct */}
        <ApercuMatchDirect matchDonnees={matchEnDirect} />

        {/* Section 3 : Tableau des Médailles en Direct */}
        <TableauMedaillesDirect listeMedailles={listeMedailles} />

        {/* Section 4 : Flux d'Actualités en Direct */}
        <FluxActualitesDirect listeActualites={listeActualites} />

      </main>

      {/* Pied de page */}
      <Footer />

    </div>
  );
};

export default PageResultats;

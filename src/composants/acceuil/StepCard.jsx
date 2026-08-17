import React from "react";

// Carte d'une étape de billetterie (alignée maquette Figma)
const StepCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center gap-2 text-center px-2">
    {/* Icône — alignée en haut avec le titre de gauche */}
    <img className="w-16 h-12 object-contain" src={icon} alt={title} />

    {/* Titre de l'étape — taille moyenne, gras */}
    <p className="text-neutral-800 text-base font-bold font-olympic leading-6">
      {title}
    </p>

    {/* Description — plus petite, gris */}
    <p className="text-neutral-600 text-[11px] font-normal font-olympic leading-4 max-w-[200px]">
      {description}
    </p>
  </div>
);

export default StepCard;

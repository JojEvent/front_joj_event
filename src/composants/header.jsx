import React from "react";
import LogoHeader from "../assets/logoPrincipal.svg";
import {
  BellIcon,
  LikeIcon,
  PanierIcon,
  ProfilIcon,
  SearchIcon,
} from "../assets";

// En-tête de la page d'accueil (design Figma)
const Header = () => {
  const navLinks = ["Événements", "Carte", "Billets", "Résultat"];

  return (
    <header className="w-full flex justify-center px-4 lg:px-[59px] py-4">
      <div className="w-full max-w-[1322px] px-2 py-4 bg-white rounded-xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.12)] flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-40">
        <img className="w-24 h-11" src={LogoHeader} alt="JOJ Dakar 2026" />

        <nav className="flex flex-wrap justify-center items-center gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <span
              key={link}
              className="text-black text-base font-normal font-olympic leading-6 cursor-pointer hover:text-green-600"
            >
              {link}
            </span>
          ))}
        </nav>

        <div className="h-11 flex justify-center items-center gap-4">
          <div className="w-60 h-9 p-2 rounded-md outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-end items-center gap-1">
            <span className="flex-1 text-black/50 text-sm font-olympic leading-5">
              Search in site
            </span>
            <img src={SearchIcon} alt="Rechercher" className="w-5 h-5" />
          </div>

          {[BellIcon, PanierIcon, LikeIcon, ProfilIcon].map((icon, index) => (
            <div
              key={index}
              className="w-9 h-9 px-2 py-1.5 bg-stone-50 rounded-full shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center cursor-pointer"
            >
              <img src={icon} alt="" className="w-4 h-4" />
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;

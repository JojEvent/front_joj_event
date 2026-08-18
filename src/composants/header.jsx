import React from "react";
import { Link } from "react-router-dom";
import LogoHeader from "../assets/logoPrincipal.svg";
import {
  BellIcon,
  LikeIcon,
  PanierIcon,
  ProfilIcon,
  SearchIcon,
} from "../assets";

const Header = () => {
  return (
    <header className="mx-auto w-full max-w-[1000px] px-3 pt-2 md:px-0 md:pt-0">
      <div className="min-h-[58px] rounded-xl bg-white px-4 py-2 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.12)] md:px-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/profil" className="shrink-0" aria-label="JOJ Event - Profil">
            <img className="h-11 w-24 object-contain" src={LogoHeader} alt="JOJ Event" />
          </Link>

          <nav className="order-3 flex w-full items-center justify-center gap-6 text-xs text-black md:order-none md:w-auto md:gap-8">
            <a href="#evenements" className="hover:text-sky-600">Événements</a>
            <a href="#carte" className="hover:text-sky-600">Carte</a>
            <a href="#billets" className="hover:text-sky-600">Billets</a>
            <a href="#resultat" className="hover:text-sky-600">Résultat</a>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden h-9 w-40 items-center gap-1 rounded-md border border-black/10 px-2 md:flex">
              <span className="flex-1 text-xs text-black/50">Search in site</span>
              <img className="h-4 w-4" src={SearchIcon} alt="Rechercher" />
            </div>

            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-50 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.18)]" aria-label="Notifications">
              <img className="h-4 w-4" src={BellIcon} alt="" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-50 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.18)]" aria-label="Panier">
              <img className="h-5 w-5" src={PanierIcon} alt="" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-50 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.18)]" aria-label="Favoris">
              <img className="h-4 w-4" src={LikeIcon} alt="" />
            </button>
            <Link
              to="/profil"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-50 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.18)]"
              aria-label="Mon profil"
            >
              <img className="h-5 w-5" src={ProfilIcon} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

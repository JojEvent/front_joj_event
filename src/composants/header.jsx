import React from "react";
import LogoHeader from "../assets/logoPrincipal.svg";
import {
  BellIcon,
  LikeIcon,
  PanierIcon,
  ProfilIcon,
  SearchIcon,
} from "../assets";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

// En-tête de la page d'accueil (design Figma)
const Header = () => {
  const { items } = useCart()
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const navLinks = ["Événements", "Carte", "Billets", "Résultat"];

  const naviguerVers = (link) => {
    if (link === "Résultat") {
      navigate("/resultat");
    } else if (link === "Événements") {
      navigate("/evenements");
    } else if (link === "Billets" || link === "Carte") {
      navigate("/panier");
    } else {
      toast.info(`La page ${link} sera bientôt disponible !`);
    }
  };

  return (
    <header className="w-full flex justify-center px-4 lg:px-[59px] py-4 sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="w-full max-w-[1322px] px-4 py-4 bg-white rounded-xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.12)] flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6">
        <Link to="/">
          <img
            className="w-24 h-11 object-contain"
            src={LogoHeader}
            alt="JOJ Dakar 2026"
          />
        </Link>

        <nav className="flex flex-wrap justify-center items-center gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <span
              key={link}
              onClick={() => naviguerVers(link)}
              className="text-black text-base font-normal font-olympic leading-6 cursor-pointer hover:text-green-600 transition-colors"
            >
              {link}
            </span>
          ))}
        </nav>

        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="w-52 lg:w-60 h-9 p-2 rounded-md outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-end items-center gap-1">
            <span className="flex-1 text-black/50 text-sm font-olympic leading-5">
              Search in site
            </span>
            <img src={SearchIcon} alt="Rechercher" className="w-5 h-5" />
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {[
                { icon: BellIcon, path: null },
                { icon: PanierIcon, path: "/panier" },
                { icon: LikeIcon, path: null },
                { icon: ProfilIcon, path: null },
              ].map((item, index) => (
                <div
                  key={index}
                  onClick={() => item.path && navigate(item.path)}
                  className="w-9 h-9 px-2 py-1.5 bg-stone-50 rounded-full shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center cursor-pointer hover:bg-stone-100 transition-colors relative"
                >
                  <img src={item.icon} alt="" className="w-4 h-4" />
                  {/* Badge uniquement sur l'icône panier */}
                    {item.path === "/panier" && items.length > 0 && (
                      <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {items.length}
                      </span>
                    )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/auth/register"
                className="px-4 py-2 text-sm font-medium font-olympic text-black bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                S'inscrire
              </Link>
              <Link
                to="/auth/login"
                className="px-4 py-2 text-sm font-medium font-olympic text-white bg-green-600 hover:bg-green-700 rounded-lg shadow transition-colors"
              >
                Se connecter
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

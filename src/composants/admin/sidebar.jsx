import React from "react";
import logo from "../../assets/logo.svg";
import { navLinks } from "../../constants/nav";
import NavLinksProps from "./navLinksProps";
import { useAuth } from "../../context/authContext";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const { logout, loading } = useAuth();

  return (
    <div className="w-56 shrink-0 h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col justify-start items-start sticky top-0">
      {/* Logo */}
      <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
        <div className="self-stretch h-16 relative border-b border-zinc-800">
          <div className="w-24 h-11 left-6 top-2.5 absolute">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <div className="self-stretch flex-1 px-3 pt-8 flex flex-col justify-start items-start gap-1 overflow-y-auto">
        <div className="self-stretch px-3 pb-3.5 flex flex-col justify-start items-start">
          <div className="self-stretch justify-center text-zinc-400 text-xs font-semibold uppercase leading-4 tracking-wider">
            Principal
          </div>
        </div>
        {navLinks.map((link) => (
          <NavLinksProps
            key={link.id}
            name={link.name}
            path={link.path}
            icon={link.icon}
          />
        ))}
      </div>

      {/* Déconnexion */}
      <div className="self-stretch p-3 border-t border-zinc-800 flex flex-col justify-start items-start">
        <button
          type="button"
          onClick={logout}
          disabled={loading}
          className="w-full px-3 py-2.5 rounded-lg inline-flex items-center gap-3 text-zinc-300 hover:text-rose-400 hover:bg-zinc-800/80 transition cursor-pointer disabled:opacity-50 group"
          title="Se déconnecter"
        >
          <LogOut className="w-5 h-5 text-zinc-400 group-hover:text-rose-400 transition" />
          <span className="text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

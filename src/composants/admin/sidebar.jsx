import React from "react";
import logo from "../../assets/logo.svg";
import { navLinks } from "../../constants/nav";
import NavLinksProps from "./navLinksProps";

const Sidebar = () => {
  return (
    <div className="w-56 h-screen bg-radial from-zinc-900 to-zinc-900 border-r border-gray-200 inline-flex flex-col justify-start items-start fixed">
      {/* Logo */}
      <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
        <div className="self-stretch h-16 relative border-b border-gray-200">
          <div className="w-24 h-11 left-6 top-2.5 absolute">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <div className="self-stretch flex-1 px-3 pt-8 flex flex-col justify-start items-start gap-1 overflow-y-auto">
        <div className="self-stretch px-3 pb-3.5 flex flex-col justify-start items-start">
          <div className="self-stretch justify-center text-zinc-300 text-xs font-semibold font-['Segoe_UI'] uppercase leading-4 tracking-wide">
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
      <div className="self-stretch p-4 border-t border-gray-200 flex flex-col justify-start items-start">
        <div className="self-stretch px-3 py-2.5 rounded-lg inline-flex justify-start items-center gap-3">
          <div className="w-5 h-4 relative">
            <div className="w-4 h-3.5 left-[2px] top-[1px] absolute bg-zinc-300" />
          </div>
          <div className="w-24 justify-center text-zinc-300 text-base font-normal font-['Segoe_UI'] leading-6">
            Déconnexion
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

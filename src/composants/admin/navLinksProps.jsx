import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLinksProps = ({ name, path, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className={`self-stretch px-3 py-2.5 rounded-lg inline-flex justify-start items-center gap-3 w-full ${
        isActive ? "bg-[#1A2F2D]" : "hover:bg-gray-800/50"
      } transition-colors duration-200`}
    >
      <img src={icon} alt={name} className="w-5 h-5 object-contain" />
      <span
        className={`text-base font-normal font-['Segoe_UI'] leading-6 ${
          isActive ? "text-green-500" : "text-zinc-300"
        }`}
      >
        {name}
      </span>
    </Link>
  );
};

export default NavLinksProps;

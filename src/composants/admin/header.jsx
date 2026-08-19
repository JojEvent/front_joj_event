import React from "react";
import { SearchIcon } from "../../assets";
import { useAuth } from "../../context/authContext";

const HeaderAdmin = () => {
  const { user } = useAuth();
  const displayName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.email || "Administrateur";

  return (
    <div className="bg-white border-b border-gray-200 w-full h-16 flex justify-between items-center px-6 lg:px-8">
      <div className="w-96 relative inline-flex flex-col justify-start items-start">
        <div className="self-stretch pl-10 pr-4 py-2 bg-gray-100 rounded-lg inline-flex justify-center items-start overflow-hidden">
          <div className="flex-1 inline-flex flex-col justify-start items-start overflow-hidden">
            <input
              type="text"
              className="w-full h-full bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-400"
              placeholder="Rechercher un événement, un site, spectateurs..."
            />
          </div>
        </div>
        <div className="h-4 left-3 top-2.5 absolute flex items-center">
          <img src={SearchIcon} alt="search" className="w-4 h-4 opacity-50" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <div className="text-gray-900 text-sm font-semibold font-['Inter'] leading-4">
            {displayName}
          </div>
          <div className="text-gray-500 text-xs font-normal font-['Inter'] uppercase leading-4">
            {user?.role === "ADMIN" ? "Admin Principal" : user?.role || "Utilisateur"}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
          {displayName.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;

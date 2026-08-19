import React from "react";
import { illust } from "../../assets";
import VerifyEmailForm from "../../composants/auth/VerifyEmailForm";

const VerifyEmail = () => {
  return (
    <div className="flex w-full h-screen bg-white overflow-hidden">
      {/* Gauche – formulaire */}
      <div className="flex flex-1 justify-center items-center px-10 py-12 overflow-y-auto">
        <VerifyEmailForm />
      </div>

      {/* Droite – illustration */}
      <div className="hidden lg:flex w-[55%] h-full">
        <img
          src={illust}
          alt="Dakar 2026 mascotte"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
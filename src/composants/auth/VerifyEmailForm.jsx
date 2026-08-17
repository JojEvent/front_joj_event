import React, { useRef, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Loader2 } from "lucide-react";

const OtpInput = ({ index, inputRef, onKeyDown }) => (
  <input
    ref={(el) => (inputRef.current[index] = el)}
    id={`otp-${index}`}
    type="text"
    inputMode="numeric"
    maxLength={1}
    onKeyDown={(e) => onKeyDown(e, index)}
    className="w-14 h-14 text-center text-2xl font-bold text-gray-900 bg-white border border-black/10 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition caret-blue-500"
  />
);

const VerifyEmailForm = ({ email = "exemple@gmail.com" }) => {
  const { verifyEmail, loading, error } = useAuth();
  const inputRef = useRef([]);

  const handleKeyDown = (e, index) => {
    if (e.key >= "0" && e.key <= "9") {
      e.preventDefault();
      e.target.value = e.key;
      // Passer au suivant
      if (index < 5) inputRef.current[index + 1]?.focus();
    } else if (e.key === "Backspace") {
      e.target.value = "";
      if (index > 0) inputRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = inputRef.current.map((input) => input.value).join("");
    // console.log(otpCode);
    await verifyEmail(otpCode);
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      {/* Titre */}
      <h1 className="text-3xl font-bold text-gray-900 text-center uppercase tracking-tight mb-4">
        Vérifiez votre e-mail
      </h1>

      {/* Sous-titre */}
      <p className="text-center text-slate-700 text-base mb-10 px-4">
        Nous avons envoyé un code de vérification à{" "}
        <span className="font-bold">{email}</span>
      </p>

      <form
        className="w-full flex flex-col items-center gap-8"
        onSubmit={handleSubmit}
      >
        {/* Inputs OTP */}
        <div className="flex justify-between gap-3 w-full">
          {[0, 1, 2, 3].map((i) => (
            <OtpInput
              key={i}
              index={i}
              inputRef={inputRef}
              onKeyDown={handleKeyDown}
            />
          ))}
        </div>

        {/* Bouton Vérifier */}
        <button
          type="submit"
          className="w-full h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-base uppercase tracking-wide rounded-lg transition"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Vérifier"}
        </button>
      </form>

      {/* Séparateur */}
      <div className="flex items-center gap-4 w-full mt-6">
        <span className="flex-1 h-px bg-slate-300" />
        <span className="text-slate-500 text-sm whitespace-nowrap">
          Vous n&apos;avez rien reçu ?
        </span>
        <span className="flex-1 h-px bg-slate-300" />
      </div>

      {/* Renvoyer le code */}
      <button
        type="button"
        className="mt-4 text-base font-bold text-black underline underline-offset-2 hover:text-blue-700 transition"
      >
        Renvoyer le code
      </button>

      {/* Retour connexion */}
      <p className="mt-10 text-sm text-slate-700">
        Retourner à la{" "}
        <a
          href="/auth/login"
          className="font-bold text-black hover:text-blue-700 transition"
        >
          page de connexion
        </a>
      </p>
    </div>
  );
};

export default VerifyEmailForm;

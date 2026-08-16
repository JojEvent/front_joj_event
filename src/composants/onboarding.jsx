import React, { useState } from "react";
import { LANGUAGES, DISCIPLINES } from "../constants/onboardData";
import { useAuth } from "../context/authContext";

const CheckCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#2563eb" />
    <path
      d="M7 12.5l3.5 3.5L17 9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EmptyCircle = () => (
  <div className="w-6 h-6 rounded-full border border-black/20" />
);

const OnboardingForm = () => {
  const [language, setLanguage] = useState("fr");
  const [step, setStep] = useState(1);
  const [discipline, setDiscipline] = useState([]);
  const { completeOnboarding, loading, user } = useAuth();

  const toggleDiscipline = (id) => {
    setDiscipline((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );
  };

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      {step === 1 && (
        <>
          <h1 className="text-2xl font-bold text-gray-900 text-center uppercase tracking-tight mb-10">
            Choisissez votre langue
          </h1>

          <div className="w-full flex flex-col gap-4 mb-8">
            {LANGUAGES.map(({ code, flag, label, disabled }) => {
              const selected = language === code;
              return (
                <button
                  key={code}
                  type="button"
                  disabled={disabled}
                  onClick={() => setLanguage(code)}
                  className={`w-full px-6 py-4 rounded-xl flex justify-between items-center transition
                    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    ${
                      selected
                        ? "bg-white outline outline-2 outline-black"
                        : "bg-white outline outline-1 outline-black/10 hover:outline-black/30"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{flag}</span>
                    <span
                      className={`text-lg font-normal ${selected ? "text-gray-900" : "text-slate-600"}`}
                    >
                      {label}
                    </span>
                  </div>
                  {selected ? <CheckCircle /> : <EmptyCircle />}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-base uppercase tracking-wide rounded-lg transition"
            onClick={() => setStep(2)}
          >
            Continuer
          </button>
        </>
      )}

      {/* ── STEP 2 : Disciplines ── */}
      {step === 2 && (
        <>
          {/* Barre nav : Retour / Passer */}
          <div className="w-full flex justify-between items-center mb-6">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm text-slate-600 hover:text-gray-900 transition"
            >
              ← Retour
            </button>
            <button
              type="button"
              onClick={completeOnboarding}
              className="text-sm text-slate-600 hover:text-gray-900 transition"
            >
              Passer
            </button>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center uppercase tracking-tight mb-8">
            Vos sports favoris
          </h1>

          {/* Grille disciplines – 3 colonnes */}
          <div className="w-full grid grid-cols-3 gap-3 mb-8">
            {DISCIPLINES.map(({ id, label, emoji }) => {
              const selected = discipline.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleDiscipline(id)}
                  className={`flex flex-col items-center gap-2 px-3 py-4 rounded-xl border transition
                    ${
                      selected
                        ? "border-blue-500 bg-blue-50"
                        : "border-black/10 bg-white hover:border-black/30"
                    }`}
                >
                  <span
                    className={`text-2xl w-10 h-10 flex items-center justify-center rounded-full
                      ${selected ? "bg-blue-100" : "bg-slate-100"}`}
                  >
                    {emoji}
                  </span>
                  <span
                    className={`text-xs font-medium ${selected ? "text-blue-700" : "text-slate-700"}`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bouton Terminer */}
          <button
            type="button"
            onClick={completeOnboarding}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-base uppercase tracking-wide rounded-lg transition"
          >
            Terminer
          </button>

          <p className="mt-4 text-xs text-slate-400 cursor-pointer hover:text-slate-600 transition">
            Dakar 2026
          </p>
        </>
      )}
    </div>
  );
};

export default OnboardingForm;

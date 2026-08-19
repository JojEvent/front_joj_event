// components/domain/panier/CartStepper.jsx
import React from "react";

/**
 * Barre d'étapes du tunnel de réservation.
 * @param {{id:number,label:string}[]} steps
 * @param {number} currentStep - id de l'étape active
 */
export default function CartStepper({ steps, currentStep }) {
  return (
    <div className="flex justify-center items-center gap-3 py-2.5">
      {steps.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isDone = step.id < currentStep;
        return (
          <div key={step.id} className="flex items-center gap-5 pl-5 relative">
            <div
              className={[
                "size-5 p-2.5 rounded-full flex justify-center items-center",
                "outline outline-1 outline-offset-[-1px]",
                isActive || isDone ? "outline-sky-600 bg-sky-600" : "outline-gray-800",
              ].join(" ")}
            >
              {isDone ? (
                <div className="w-2 h-1.5 bg-white" />
              ) : (
                <span
                  className={[
                    "text-xs font-medium font-['Inter']",
                    isActive ? "text-white" : "text-gray-800",
                  ].join(" ")}
                >
                  {step.id}
                </span>
              )}
            </div>

            {idx < steps.length - 1 && (
              <div className="w-24 h-0.5 bg-neutral-200 rounded-lg overflow-hidden" />
            )}

            <div
              className={[
                "absolute top-[27.5px] left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-xs font-medium font-['Inter']",
                isActive ? "text-sky-600" : "text-neutral-800",
              ].join(" ")}
            >
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
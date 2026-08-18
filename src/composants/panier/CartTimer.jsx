// components/domain/panier/CartTimer.jsx
import React, { useEffect, useState } from "react";

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

/**
 * Timer de réservation (décompte). Appelle onExpire() une fois arrivé à 0.
 * @param {number} initialSeconds
 * @param {() => void} [onExpire]
 */
export default function CartTimer({ initialSeconds, onExpire }) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire?.();
      return;
    }
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft, onExpire]);

  const isUrgent = secondsLeft <= 60;

  return (
    <div className="flex flex-col justify-center items-center gap-1 w-64">
      <p className="text-center text-neutral-800 text-2xl font-bold font-['Olympic_Headline']">
        Mon Panier
      </p>
      <p className="text-center text-neutral-600 text-sm font-normal font-['Inter']">
        Vous avez 15 min pour valider votre réservation
      </p>
      <div className="mt-3 px-3 py-2.5 bg-neutral-100 rounded-lg flex justify-between items-center gap-3">
        <svg
          className={isUrgent ? "size-5 fill-red-700" : "size-5 fill-neutral-700"}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="8" />
        </svg>
        <span
          className={[
            "text-lg font-normal font-['Inter']",
            isUrgent ? "text-red-700" : "text-neutral-800",
          ].join(" ")}
        >
          {formatTime(secondsLeft)}
        </span>
      </div>
    </div>
  );
}
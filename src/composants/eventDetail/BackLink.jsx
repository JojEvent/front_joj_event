// composants/eventDetail/BackLink.jsx
import { ArrowLeft } from "lucide-react";

export default function BackLink({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex justify-start items-center gap-2 py-8"
    >
      <ArrowLeft className="size-6 text-zinc-900" />
      <span className="text-zinc-900 text-lg font-medium font-['Olympic_Sans_Medium'] leading-7">
        Retour aux événements
      </span>
    </button>
  );
}

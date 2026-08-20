import { X } from "lucide-react";

import assistant from "../../assets/assistantIA.png";

function AssistantHeader({ onClose }) {
  return (
    <div className="self-stretch px-5 py-4 bg-Primaire shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] inline-flex justify-between items-center bg-blue-600">
      <div className="size- flex justify-start items-center gap-[5px]">
        <div className="w-10 h-10 relative">
          <img
            className="w-10 h-10 left-0 top-0 absolute rounded-full object-cover"
            src={assistant}
            alt="AYO"
          />

          <div className="size-2.5 right-0 bottom-0 absolute bg-green-400 rounded-full border-2 border-sky-600" />
        </div>

        <div className="size- inline-flex flex-col justify-start items-start">
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="justify-center text-white text-sm font-bold font-['Olympic_Headline'] leading-4 tracking-tight">
              AYO
            </div>
          </div>

          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="w-12 justify-center text-white/70 text-[10px] font-medium font-['Inter'] uppercase leading-4 tracking-wide">
              En ligne
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="size-8 rounded-lg flex justify-center items-center hover:bg-white/10 transition-colors"
      >
        <X className="size-4 text-white/70" strokeWidth={2} />
      </button>
    </div>
  );
}

export default AssistantHeader;
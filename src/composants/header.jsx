import React from "react";

const Header = () => {
  return (
    <div className="w-full px-2 py-4 bg-white rounded-xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.12)] inline-flex justify-center items-center gap-40 overflow-hidden">
      <img className="w-24 h-11" src="https://placehold.co/95x44" />
      <div className="size- bg-white flex justify-center items-center gap-10">
        <div className="justify-start text-black text-base font-normal font-['Olympic_Sans'] leading-6">
          Événements
        </div>
        <div className="justify-start text-black text-base font-normal font-['Olympic_Sans'] leading-6">
          Carte
        </div>
        <div className="justify-start text-black text-base font-normal font-['Olympic_Sans'] leading-6">
          Billets
        </div>
        <div className="justify-start text-black text-base font-normal font-['Olympic_Sans'] leading-6">
          Résultat{" "}
        </div>
      </div>
      <div className="h-11 px-[5px] py-0.5 bg-white flex justify-center items-center gap-4 overflow-hidden">
        <div className="w-60 h-9 inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          <div className="self-stretch p-2 rounded-md outline outline-1 outline-offset-[-1px] outline-black/10 inline-flex justify-end items-center gap-1">
            <div className="flex-1 justify-start text-black/50 text-sm font-normal font-['Olympic_Sans'] leading-5">
              Search in site
            </div>
            <div className="size-5 relative">
              <div className="size-4 left-[1.67px] top-[1.67px] absolute bg-black/70" />
            </div>
          </div>
        </div>
        <div className="size-9 px-2 py-1.5 bg-stone-50 rounded-[50px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-2.5 overflow-hidden">
          <div className="size-4 relative overflow-hidden">
            <div className="w-3 h-3.5 left-[2px] top-[1.33px] absolute outline outline-[1.60px] outline-offset-[-0.80px] outline-Icon-Default-Default" />
          </div>
        </div>
        <div className="size-9 px-2 py-1.5 bg-stone-50 rounded-[50px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-2.5 overflow-hidden">
          <div className="size-5 relative overflow-hidden">
            <div className="w-5 h-4 left-[0.83px] top-[0.83px] absolute outline outline-2 outline-offset-[-1px] outline-Icon-Default-Default" />
          </div>
        </div>
        <div className="size-9 px-2 py-1.5 bg-stone-50 rounded-[50px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-2.5 overflow-hidden">
          <div className="size-4 relative overflow-hidden">
            <div className="w-3.5 h-3 left-[1.03px] top-[2px] absolute outline outline-[1.60px] outline-offset-[-0.80px] outline-Icon-Default-Default" />
          </div>
        </div>
        <div className="size-9 px-1.5 py-[5px] bg-stone-50 rounded-[50px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-2.5 overflow-hidden">
          <div className="size-5 relative overflow-hidden">
            <div className="size-3.5 left-[3.33px] top-[2.50px] absolute outline outline-2 outline-offset-[-1px] outline-Icon-Default-Default" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import LogoHeader from "../assets/logoPrincipal.svg";
import {
  BellIcon,
  LikeIcon,
  PanierIcon,
  ProfilIcon,
  SearchIcon,
} from "../assets";

const Header = () => {
  return (
    <div className="w-full px-2 py-4 bg-white rounded-xl shadow-[0px_0px_6px_0px_rgba(0,0,0,0.12)] inline-flex justify-center items-center gap-40 overflow-hidden">
      <img className="w-44 h-11" src={LogoHeader} alt="LogoHeader" />
      <div className="size- bg-white flex justify-center items-center gap-10">
        <div className="justify-start text-black text-base font-normal font-olympic leading-6">
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
              <img src={SearchIcon} alt="SearchIcon" />
            </div>
          </div>
        </div>
        <div className="size-9 px-2 py-1.5 bg-stone-50 rounded-[50px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-2.5 overflow-hidden">
          <div className="size-4 relative overflow-hidden">
            <img src={BellIcon} alt="BellIcon" />
          </div>
        </div>
        <div className="size-9 px-2 py-1.5 bg-stone-50 rounded-[50px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-2.5 overflow-hidden">
          <div className="size-5 relative overflow-hidden">
            <img src={PanierIcon} alt="PanierIcon" />
          </div>
        </div>
        <div className="size-9 px-2 py-1.5 bg-stone-50 rounded-[50px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-2.5 overflow-hidden">
          <div className="size-4 relative overflow-hidden">
            <img src={LikeIcon} alt="LikeIcon" />
          </div>
        </div>
        <div className="size-9 px-1.5 py-[5px] bg-stone-50 rounded-[50px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-2.5 overflow-hidden">
          <div className="size-5 relative overflow-hidden">
            <img src={ProfilIcon} alt="ProfilIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

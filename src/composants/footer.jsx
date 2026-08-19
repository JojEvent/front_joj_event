import React from "react";
import LogoPrincipal from "../assets/logoPrincipal.svg";
import {
  ArrowLeftIcon,
  FacebookIcon,
  MailIcon,
  TelegramIcon,
  TwitterIcon,
} from "../assets";

const Footer = () => {
  return (
    <div className="w-full h-[740px] bg-white inline-flex flex-col justify-start items-start">
      <div className="self-stretch px-24 py-12 bg-white border-t-[0.50px] border-neutral-200 flex flex-col justify-start items-start gap-2.5 overflow-hidden">
        <div className="self-stretch flex flex-col justify-start items-start gap-12">
          <div className="self-stretch flex flex-col justify-start items-start gap-12">
            <img className="w-24 h-11" src={LogoPrincipal} />
            <div className="self-stretch inline-flex justify-between items-start gap-10">
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-14">
                <div className="self-stretch h-32 flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch justify-end text-neutral-800 text-2xl font-medium font-olympic-medium">
                    Qui sommes-nous ?
                  </div>
                  <div className="w-140.25 justify-end text-neutral-600 text-sm font-normal font-olympic line-clamp-4">
                    JOJ_EVENT Dakar 2026 est une plateforme digitale dédiée à
                    l’orientation, aux accès et au suivi en temps réel des
                    événements des Jeux Olympiques de la Jeunesse. Elle
                    accompagne les spectateurs, VIP et journalistes pour vivre
                    une expérience fluide, informée et sécurisée.
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch justify-end text-neutral-800 text-xl font-medium font-olympic-medium">
                    Contact
                  </div>
                  <div className="self-stretch justify-end text-neutral-600 text-base font-normal font-olympic leading-6 line-clamp-1">
                    jojevent@gmail.com
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-between items-start">
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch justify-start text-neutral-800 text-2xl font-medium font-olympic-medium">
                      BILLETTERIE
                    </div>
                    <div className="w-28 h-0 max-w-28 outline outline-1 outline-offset-[-0.50px] outline-zinc-400"></div>
                  </div>
                  <div className="self-stretch justify-start text-neutral-600 text-sm font-normal font-olympic line-clamp-1">
                    À propos
                  </div>
                  <div className="self-stretch justify-start text-neutral-600 text-sm font-normal font-olympic line-clamp-1">
                    Contactez-nous
                  </div>
                  <div className="self-stretch justify-start text-neutral-600 text-sm font-normal font-olympic line-clamp-1">
                    FAQ
                  </div>
                </div>
                <div className="flex-1 h-44 max-h-44 inline-flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch justify-start text-neutral-800 text-2xl font-medium font-olympic-medium">
                      Aide
                    </div>
                    <div className="w-full h-0 max-w-16 outline outline-1 outline-offset-[-0.50px] outline-zinc-400"></div>
                  </div>
                  <div className="w-20 inline-flex justify-start items-center gap-2.5">
                    <div className="flex-1 justify-start text-neutral-600 text-sm font-normal font-olympic">
                      Billetterie{" "}
                    </div>
                  </div>
                  <div className="self-stretch justify-start text-neutral-600 text-sm font-normal font-olympic line-clamp-1">
                    Support Compte
                  </div>
                  <div className="self-stretch justify-start text-neutral-600 text-sm font-normal font-olympic line-clamp-1">
                    Conditions Générales
                  </div>
                </div>
                <div className="flex-1 h-36 max-h-48 inline-flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch justify-start text-neutral-800 text-2xl font-medium font-olympic-medium">
                      Légal
                    </div>
                    <div className="w-full h-0 max-w-16 outline outline-1 outline-offset-[-0.50px] outline-zinc-400"></div>
                  </div>
                  <div className="self-stretch inline-flex justify-center items-center gap-2.5">
                    <div className="flex-1 justify-start text-neutral-600 text-base font-normal font-olympic leading-6 line-clamp-1">
                      Conditions d&apos;utilisation
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-center items-center gap-2.5">
                    <div className="flex-1 justify-start text-neutral-600 text-base font-normal font-olympic leading-6 line-clamp-1">
                      Politique d&apos;utilisation
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                    <div className="justify-start text-neutral-600 text-base font-normal font-olympic leading-6 line-clamp-1">
                      Politique de confidentialité
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-14">
            <div className="self-stretch h-[0.50px] bg-stone-300 rounded-[1px]" />
            <div className="self-stretch inline-flex justify-start items-center gap-72">
              <div className="flex-1 justify-start text-neutral-600 text-2xl font-medium font-olympic-medium line-clamp-2">
                Rejoignez notre liste de diffusion pour rester informé de nos
                actualités...
              </div>
              <div className="flex-1 flex justify-start items-start gap-4">
                <div
                  data-left-icon-boolian="true"
                  data-right-icon-boolian="true"
                  data-size="56"
                  data-state="Normal"
                  className="flex-1 p-4 rounded-2xl outline outline-1 outline-offset-[-1px] outline-neutral-500 flex justify-between items-center"
                >
                  <div className="flex-1 flex justify-start items-center gap-2">
                    <div className="size-5 relative overflow-hidden">
                      <img src={MailIcon} alt="MailIcon" />
                    </div>
         {/* ======================================================
    SECTION 3 : ÉVÉNEMENTS
    ====================================================== */}            <div className="flex-1 justify-start text-neutral-600 text-sm font-normal font-olympic line-clamp-1">
                      Entrez votre adresse e-mail
                    </div>
                  </div>
                  <div className="size-6 relative overflow-hidden">
                    <img src={ArrowLeftIcon} alt="ArrowLeftIcon" />
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[0.50px] bg-stone-300 rounded-[1px]" />
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-neutral-600 text-base font-normal font-olympic leading-6 line-clamp-1">
              © 2026 Tous droits réservés.
            </div>
            <div className="flex-1 flex justify-center items-center gap-8">
              <div className="justify-start text-neutral-800 text-base font-medium font-olympic-medium">
                Conditions
              </div>
              <div className="justify-start text-neutral-800 text-base font-medium font-olympic-medium">
                Confidentialité
              </div>
            </div>
            <div className="size- flex justify-start items-start gap-6">
              <div className="size-6 p-2.5 bg-blue-600 rounded-[40px] flex justify-center items-center gap-2.5">
                <img src={TwitterIcon} alt="TwitterIcon" />
              </div>
              <div className="size-6 relative bg-blue-600 rounded-[40px]">
                <img src={TelegramIcon} alt="telegram" />
              </div>
              <div className="size-6 relative">
                <img src={FacebookIcon} alt="facebook" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-[740px] bg-white inline-flex flex-col justify-start items-start">
      <div className="self-stretch px-24 py-12 bg-white border-t-[0.50px] border-neutral-200 flex flex-col justify-start items-start gap-2.5 overflow-hidden">
        <div className="self-stretch flex flex-col justify-start items-start gap-12">
          <div className="self-stretch flex flex-col justify-start items-start gap-12">
            <img className="w-24 h-11" src="https://placehold.co/95x44" />
            <div className="self-stretch inline-flex justify-between items-start">
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-14">
                <div className="self-stretch h-32 flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch justify-end text-neutral-800 text-2xl font-medium font-['Olympic_Sans_Medium']">
                    Qui sommes-nous ?
                  </div>
                  <div className="w-[561px] justify-end text-neutral-600 text-sm font-normal font-['Olympic_Sans'] line-clamp-4">
                    JOJ_EVENT Dakar 2026 est une plateforme digitale dédiée à
                    l’orientation, aux accès et au suivi en temps réel des
                    événements des Jeux Olympiques de la Jeunesse. Elle
                    accompagne les spectateurs, VIP et journalistes pour vivre
                    une expérience fluide, informée et sécurisée.
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch justify-end text-neutral-800 text-xl font-medium font-['Olympic_Sans_Medium']">
                    Contact
                  </div>
                  <div className="self-stretch justify-end text-neutral-600 text-base font-normal font-['Olympic_Sans'] leading-6 line-clamp-1">
                    jojevent@gmail.com
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-between items-start">
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch justify-start text-neutral-800 text-2xl font-medium font-['Olympic_Sans_Medium']">
                      BILLETTERIE
                    </div>
                    <div className="w-28 h-0 max-w-28 outline outline-1 outline-offset-[-0.50px] outline-zinc-400"></div>
                  </div>
                  <div className="self-stretch justify-start text-neutral-600 text-sm font-normal font-['Olympic_Sans'] line-clamp-1">
                    À propos
                  </div>
                  <div className="self-stretch justify-start text-neutral-600 text-sm font-normal font-['Olympic_Sans'] line-clamp-1">
                    Contactez-nous
                  </div>
                  <div className="self-stretch justify-start text-neutral-600 text-sm font-normal font-['Olympic_Sans'] line-clamp-1">
                    FAQ
                  </div>
                </div>
                <div className="flex-1 h-44 max-h-44 inline-flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch justify-start text-neutral-800 text-2xl font-medium font-['Olympic_Sans_Medium']">
                      Aide
                    </div>
                    <div className="w-full h-0 max-w-16 outline outline-1 outline-offset-[-0.50px] outline-zinc-400"></div>
                  </div>
                  <div className="w-20 inline-flex justify-start items-center gap-2.5">
                    <div className="flex-1 justify-start text-neutral-600 text-sm font-normal font-['Olympic_Sans']">
                      Billetterie{" "}
                    </div>
                  </div>
                  <div className="self-stretch justify-start text-neutral-600 text-sm font-normal font-['Olympic_Sans'] line-clamp-1">
                    Support Compte
                  </div>
                  <div className="self-stretch justify-start text-neutral-600 text-sm font-normal font-['Olympic_Sans'] line-clamp-1">
                    Conditions Générales
                  </div>
                </div>
                <div className="flex-1 h-36 max-h-48 inline-flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch justify-start text-neutral-800 text-2xl font-medium font-['Olympic_Sans_Medium']">
                      Légal
                    </div>
                    <div className="w-full h-0 max-w-16 outline outline-1 outline-offset-[-0.50px] outline-zinc-400"></div>
                  </div>
                  <div className="self-stretch inline-flex justify-center items-center gap-2.5">
                    <div className="flex-1 justify-start text-neutral-600 text-base font-normal font-['Olympic_Sans'] leading-6 line-clamp-1">
                      Conditions d&apos;utilisation
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-center items-center gap-2.5">
                    <div className="flex-1 justify-start text-neutral-600 text-base font-normal font-['Olympic_Sans'] leading-6 line-clamp-1">
                      Politique d&apos;utilisation
                    </div>
                  </div>
                  <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                    <div className="justify-start text-neutral-600 text-base font-normal font-['Olympic_Sans'] leading-6 line-clamp-1">
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
              <div className="flex-1 justify-start text-neutral-600 text-2xl font-medium font-['Olympic_Sans_Medium'] line-clamp-2">
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
                      <div className="w-4 h-3.5 left-[1.04px] top-[3.13px] absolute bg-gray-800" />
                    </div>
                    <div className="flex-1 justify-start text-neutral-600 text-sm font-normal font-['Olympic_Sans'] line-clamp-1">
                      Entrez votre adresse e-mail
                    </div>
                  </div>
                  <div className="size-6 relative overflow-hidden">
                    <div className="size-3.5 left-[5.25px] top-[5.25px] absolute bg-gray-800" />
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[0.50px] bg-stone-300 rounded-[1px]" />
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-neutral-600 text-base font-normal font-['Olympic_Sans'] leading-6 line-clamp-1">
              © 2026 Tous droits réservés.
            </div>
            <div className="flex-1 flex justify-center items-center gap-8">
              <div className="justify-start text-neutral-800 text-base font-medium font-['Olympic_Sans_Medium']">
                Conditions
              </div>
              <div className="justify-start text-neutral-800 text-base font-medium font-['Olympic_Sans_Medium']">
                Confidentialité
              </div>
            </div>
            <div className="size- flex justify-start items-start gap-6">
              <div className="size-6 p-2.5 bg-blue-600 rounded-[40px] flex justify-center items-center gap-2.5">
                <div className="size-2.5 bg-white" />
              </div>
              <div className="size-6 relative bg-blue-600 rounded-[40px]">
                <div className="size-2.5 left-[6px] top-[7px] absolute bg-white" />
              </div>
              <div className="size-6 relative">
                <div className="size-6 left-0 top-0 absolute bg-blue-600 rounded-[40px]">
                  <div className="w-2 h-4 left-[8px] top-[8px] absolute bg-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

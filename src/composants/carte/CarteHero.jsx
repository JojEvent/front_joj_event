// composants/carte/CarteHero.jsx
export default function CarteHero() {
  return (
    <section className="self-stretch w-full bg-white flex justify-center items-center py-6">
      <div className="w-full max-w-[1220px] px-4 relative bg-stone-50  overflow-hidden">
        {/* Formes décoratives évoquant les couleurs du Sénégal, en arrière-plan */}
        <div className="pointer-events-none absolute -left-24 -top-24 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 -bottom-32 w-96 h-96 rounded-full bg-green-600/10 blur-3xl" />
        <div className="pointer-events-none absolute right-1/3 -top-16 w-64 h-64 rounded-full bg-red-600/10 blur-3xl" />

        <div className="relative flex flex-col items-center gap-4 py-16 px-4 text-center">
          <h1 className="text-black text-4xl sm:text-5xl font-bold font-olympic-headline uppercase tracking-wide">
            Carte interactive
          </h1>
          <p className="max-w-xl text-neutral-500 text-base sm:text-lg font-olympic leading-7">
            Trouvez votre entrée, consultez les zones officielles et les points d'accès VIP ou standard
          </p>
        </div>
      </div>
    </section>
  );
}

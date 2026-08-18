import baniere from "../../assets/baniere.png";

export default function HeroBanner({
  title = "Dakar 2026 :\nL'avenir du sport",
  subtitle = "Vivez l'intensité, la passion et les moments historiques des Jeux Olympiques de la Jeunesse. Sécurisez votre place au cœur de l'action.",
  image = baniere,
}) {
  return (
    <section className="self-stretch h-[540px] bg-white flex justify-center items-center">
      <div className="w-full max-w-[1220px] h-[540px] px-4 relative bg-slate-950 rounded-[32px] flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-center items-start">
          <img className="w-full h-full object-cover opacity-60" src={image} alt="" />
          <div className="absolute inset-0 bg-linear-270 from-black via-black/0 to-black/0" />
        </div>

        <div className="max-w-[768px] min-w-[672px] flex flex-col justify-start items-center gap-6 relative">
          <h1 className="text-center text-white text-6xl font-bold font-['Olympic_Headline'] leading-[80px] whitespace-pre-line">
            {title}
          </h1>
          <p className="w-full max-w-[672px] text-center text-white/80 text-xl font-normal font-['Olympic_Sans'] leading-7">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
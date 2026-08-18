import React from "react";

const JournalArticle = ({ image, date, title, description }) => (
  <div className="inline-flex justify-start items-start">
    <div className="flex justify-start items-center gap-5">
      <img className="w-60 h-36 rounded-md object-cover" src={image} alt={title} />
      <div className="w-60 inline-flex flex-col justify-start items-start gap-2">
        <div className="self-stretch justify-start text-neutral-800/60 text-[10px] font-normal leading-[10.09px]">{date}</div>
        <div className="self-stretch justify-start text-neutral-800 text-lg font-normal leading-6">{title}</div>
        <div className="self-stretch justify-start text-stone-500 text-xs font-normal leading-4">{description}</div>
      </div>
    </div>
  </div>
);

export default JournalArticle;

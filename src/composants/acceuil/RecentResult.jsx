import React from "react";

const RecentResult = ({ icon, title, subtitle, description }) => (
  <div className="self-stretch flex flex-col justify-center items-start gap-10">
    <div className="self-stretch p-4 rounded-md outline outline-1 outline-offset-[-1px] outline-black/10 inline-flex justify-center items-start gap-4">
      <div className="w-24 h-24 flex justify-center items-center overflow-hidden">
        {icon}
      </div>
      <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
        <div className="self-stretch justify-start text-black text-xl font-bold leading-7">{title}</div>
        <div className="self-stretch justify-start text-black/50 text-sm font-normal leading-5">{subtitle}</div>
        <div className="self-stretch justify-start text-black text-base font-normal leading-6">{description}</div>
      </div>
    </div>
  </div>
);

export default RecentResult;

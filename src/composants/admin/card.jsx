import React from "react";

const Card = ({ title, icon, stats, desc }) => {
  return (
    <div className="w-[265.5px] h-39.5 relative bg-white rounded-xl outline-none shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] inline-flex flex-col justify-start items-start p-4">
      <div className="self-stretch inline-flex justify-between items-center">
        <div className="size-10 bg-blue-50 rounded-lg flex justify-center items-center">
          <div className="w-5 h-4 relative">
            {icon}
          </div>
        </div>
        <div className="size- inline-flex flex-col justify-start items-end">
          <div className="justify-start text-gray-500 text-xs font-semibold font-['Inter'] uppercase tracking-wide">
            {title}
          </div>
        </div>
      </div>
      <div className="justify-start text-gray-900 text-3xl font-bold font-['Inter'] leading-9">
        {stats}
      </div>
      <div className="justify-start text-gray-500 text-xs font-normal font-['Inter'] leading-4">
        {desc}
      </div>
    </div>
  );
};

export default Card;

import React from "react";

const Card = ({ title, icon, children }) => {
  return (
    <div className="bg-[#1D1D1D] lg:w-[650px] w-full h-[437px] py-16 flex flex-col items-center rounded-lg">
      <div className="flex">
        <img src={`/assets/${icon}.svg`} alt="icons" />
        <h1 className="font-Jost text-2xl font-semibold ml-3">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default Card;

import React from "react";

const Card = ({ title, icon, children }) => {
  return (
    <div className="bg-[#16161c59] lg:w-[650px] w-full lg:h-[467px] py-16 flex flex-col items-center rounded-lg">
      <div className="flex items-center">
        {icon && <img src={`/assets/${icon}.svg`} alt="icons" />}
        {title && (
          <h1 className="font-Jost lg:text-2xl text-base font-semibold ml-3 capitalize">
            {title}
          </h1>
        )}
      </div>
      {children}
    </div>
  );
};

export default Card;

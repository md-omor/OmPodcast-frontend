import React from "react";

const Card = ({ title, children }) => {
  return (
    <>
      <h1 className="font-Jost text-2xl font-bold">{title}</h1>
      {children}
    </>
  );
};

export default Card;

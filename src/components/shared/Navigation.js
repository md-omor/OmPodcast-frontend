import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="container mx-auto px-4 py-5">
      <Link to="/">
        <h1 className="font-Oxanium font-bold text-2xl">OMPodcast</h1>
      </Link>
    </div>
  );
};

export default Navigation;

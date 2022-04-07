import React from "react";

const StepName = ({ onNext }) => {
  return (
    <div>
      StepName
      <button onClick={onNext} className="bg-white ">
        Next
      </button>
    </div>
  );
};

export default StepName;

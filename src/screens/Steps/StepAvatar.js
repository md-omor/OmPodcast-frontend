import React from "react";

const StepAvatar = ({ onNext }) => {
  return (
    <div>
      StepAvatar
      <button onClick={onNext} className="bg-white ">
        Next
      </button>
    </div>
  );
};

export default StepAvatar;

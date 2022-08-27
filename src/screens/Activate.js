import React, { useState } from "react";
import StepAvatar from "./Steps/StepAvatar";
import StepName from "./Steps/StepName";
const steps = {
  1: StepName,
  2: StepAvatar,
};

const Activate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  const onNext = () => {
    setStep(step + 1);
  };

  return <Step onNext={onNext}></Step>;
};

export default Activate;

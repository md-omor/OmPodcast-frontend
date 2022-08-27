import React, { useState } from "react";
import StepAvatar from "./Steps/StepAvatar";
import StepName from "./Steps/StepName";
import StepOtp from "./Steps/StepOtp";
import StepPhoneEmail from "./Steps/StepPhoneEmail";
import StepUsername from "./Steps/StepUsername";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
  3: StepName,
  4: StepAvatar,
  5: StepUsername,
};

const Register = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  const onNext = () => {
    setStep(step + 1);
  };

  return (
    <div>
      <Step onNext={onNext} />
    </div>
  );
};

export default Register;

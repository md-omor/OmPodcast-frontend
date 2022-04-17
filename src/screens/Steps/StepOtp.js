import React, { useState } from "react";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import TextInput from "../../components/shared/TextInput";

const StepOtp = ({ onNext }) => {
  const [otp, setotp] = useState("");

  const next = () => {};
  return (
    <div className="flex items-center justify-center mt-24 flex-col ">
      <Card title="Enter the code we just texted you" icon="lock">
        <TextInput value={otp} onChange={(e) => setotp(e.target.value)} />
        <Button text="Next" onClick={next} />
        <p className="text-[#C4C5C5] font-Jost font-medium text-sm mt-5 w-[301px] text-center">
          Didn’t receive? Tap to resend
        </p>
      </Card>
    </div>
  );
};

export default StepOtp;

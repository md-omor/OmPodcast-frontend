import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import TextInput from "../../components/shared/TextInput";
import { verifyOtp } from "../../http";
import { setAuth } from "../../store/authSlice";

const StepOtp = ({ onNext }) => {
  const [otp, setotp] = useState("");
  const { phone, hash } = useSelector((state) => state.auth.otp);
  const dispatch = useDispatch();

  const submit = async () => {
    if (!otp || !phone || !hash) return;

    try {
      const { data } = await verifyOtp({ otp, phone, hash });
      console.log(data);
      dispatch(setAuth(data));
      // onNext();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto w-full h-[80vh]">
      <div className="flex items-center justify-center mt-24 flex-col ">
        <Card title="Enter the code we just texted you" icon="lock">
          <TextInput value={otp} onChange={(e) => setotp(e.target.value)} />
          <Button text="Next" onClick={submit} />
          <p className="text-[#C4C5C5] font-Jost font-medium text-sm mt-5 w-[301px] text-center">
            Didn’t receive? Tap to resend
          </p>
        </Card>
      </div>
    </div>
  );
};

export default StepOtp;

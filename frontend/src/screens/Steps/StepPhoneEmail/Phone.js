import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/shared/Button";
import Card from "../../../components/shared/Card";
import TextInput from "../../../components/shared/TextInput";
import { sendOtp } from "../../../http";
import { setOtp } from "../../../store/authSlice";

const Phone = ({ onNext }) => {
  const [phoneNumber, setphoneNumber] = useState("");

  const dispatch = useDispatch();

  // console.log({ phone: phoneNumber });

  const submit = async () => {
    // server request
    const { data } = await sendOtp({ phone: phoneNumber });
    console.log(data);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
  };

  return (
    <div className="container mx-auto h-[80vh]">
      <div className="w-full flex justify-center items-center ">
        <Card title="Enter you phone number" icon="phone">
          <TextInput
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
          />
          <Button text="Next" onClick={submit} />
          <p className="text-[#C4C5C5] font-Jost font-medium text-sm mt-5 w-[301px] text-center">
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Phone;

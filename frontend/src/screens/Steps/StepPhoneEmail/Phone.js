import React, { useState } from "react";
import Button from "../../../components/shared/Button";
import Card from "../../../components/shared/Card";
import TextInput from "../../../components/shared/TextInput";

const Phone = ({ onNext }) => {
  const [phoneNumber, setphoneNumber] = useState("");

  return (
    <>
      <Card title="Enter you phone number" icon="phone">
        <TextInput
          value={phoneNumber}
          onChange={(e) => setphoneNumber(e.target.value)}
        />
        <Button text="Next" onClick={onNext} />
        <p className="text-[#C4C5C5] font-Jost font-medium text-sm mt-5 w-[301px] text-center">
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </Card>
    </>
  );
};

export default Phone;

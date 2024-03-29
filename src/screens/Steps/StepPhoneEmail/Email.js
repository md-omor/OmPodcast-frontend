import React, { useState } from "react";
import Button from "../../../components/shared/Button";
import Card from "../../../components/shared/Card";
import TextInput from "../../../components/shared/TextInput";

const Email = ({ onNext }) => {
  const [email, setEmail] = useState("");
  return (
    <div className="container mx-auto h-[80vh]">
      <div className="w-full flex justify-center items-center ">
        <Card title="Enter your email id" icon="email">
          <TextInput
            fullwidth="false"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button text="Next" onClick={onNext} />
          <p className="text-[#C4C5C5] font-Jost font-medium text-sm mt-5 w-[301px] text-center">
            By entering your email, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Email;

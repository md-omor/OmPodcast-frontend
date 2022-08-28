import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import TextInput from "../../components/shared/TextInput";
import { setName } from "../../store/activateSlice";

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const dispatch = useDispatch();
  const [fullName, setfullName] = useState(name);

  const nextStep = () => {
    if (!fullName) {
      return;
    }

    dispatch(setName(fullName));
    onNext();
  };
  return (
    <div className="container mx-auto h-[80vh]">
      <div className="w-full flex justify-center items-center mt-24 flex-col ">
        <Card title="What’s your full name?" icon="google">
          <TextInput
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            fullwidth="false"
          />
          <p className="text-[#C4C5C5] font-Jost font-medium text-sm mt-5 w-[301px] text-center">
            People use real names at ompodcast :)
          </p>
          <Button text="Next" onClick={nextStep} />
        </Card>
      </div>
    </div>
  );
};

export default StepName;

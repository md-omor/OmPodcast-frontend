import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import { activate } from "../../http";
import { setAvatar } from "../../store/activateSlice";

const StepAvatar = ({ onNext }) => {
  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState("/assets/avatar.svg");
  const dispatch = useDispatch();

  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };

  const submit = async () => {
    try {
      const { data } = await activate({ name, avatar });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto h-[80vh]">
      <div className="w-full flex justify-center items-center mt-[96px] flex-col ">
        <Card title={`Okay, ${name}`} icon="monkey">
          <p className="text-[#C4C5C5] font-Jost font-medium text-sm mt-5 w-[301px] text-center">
            How’s this photo?
          </p>
          <div className="w-[120px] h-[130px] flex items-center justify-center overflow-hidden my-5">
            <img
              className="w-[100%] h-[100%] object-cover"
              src={image}
              alt="avatar"
            />
          </div>
          <div>
            <input
              onChange={captureImage}
              id="avatarInput"
              type="file"
              className="hidden"
            />
            <label
              className="text-[#0077ff] my-8 mx-0 cursor-pointer "
              htmlFor="avatarInput"
            >
              Choose a different photo
            </label>
          </div>

          <Button text="Next" onClick={submit} />
        </Card>
      </div>
    </div>
  );
};

export default StepAvatar;

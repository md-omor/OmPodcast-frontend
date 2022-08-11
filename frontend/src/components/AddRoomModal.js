import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom as create } from "../http/index";
import TextInput from "./shared/TextInput";

const AddRoomModal = ({ onClose }) => {
  const [roomType, setroomType] = useState("open");
  const [topic, settopic] = useState("");
  const navigate = useNavigate();

  const createRoom = async () => {
    if (!topic) return;
    try {
      const { data } = await create({ topic, roomType });

      navigate(`/room/${data.id}`, {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center ">
      <div className="w-[50%] max-w-[500px] bg-zinc-900 rounded-xl relative">
        <button className="absolute right-8 top-10" onClick={onClose}>
          <img src="/assets/close.svg" alt="close" />
        </button>
        <div className="p-8 border-b-2 border-[#262626]">
          <h1 className="font-bold font-Oxanium text-xl -mb-4">
            Enter the topic to be disscussed
          </h1>
          <TextInput
            fullwidth="true"
            value={topic}
            onChange={(e) => settopic(e.target.value)}
            placeholder="Room name"
          />
          <h1 className="my-4 font-bold font-Oxanium text-lg">Room type</h1>
          <div className="flex items-center justify-between">
            <div
              onClick={() => setroomType("open")}
              className={`flex flex-col items-center justify-center  px-5 py-3 rounded-xl cursor-pointer ${
                roomType === "open" && "bg-zinc-800"
              }`}
            >
              <img src="/assets/globe.png" alt="globe" className="" />
              <span className="text-sm mt-1 font-medium font-Jost ">Open</span>
            </div>

            <div
              onClick={() => setroomType("social")}
              className={`flex flex-col items-center justify-center px-5 py-3 rounded-xl cursor-pointer ${
                roomType === "social" && "bg-zinc-800"
              }`}
            >
              <img src="/assets/social.png" alt="social" className="" />
              <span className="text-sm mt-1 font-medium font-Jost ">
                Social
              </span>
            </div>

            <div
              onClick={() => setroomType("closed")}
              className={`flex flex-col items-center justify-center px-5 py-3 rounded-xl cursor-pointer ${
                roomType === "closed" && "bg-zinc-800"
              }`}
            >
              <img src="/assets/lock.png" alt="lock" className="" />
              <span className="text-sm mt-1 font-medium font-Jost ">
                Closed
              </span>
            </div>
          </div>
        </div>
        <div className="mt-7 flex items-center flex-col mb-8">
          <h1 className="font-semibold font-Oxanium text-lg">
            Start a room, open to everyone
          </h1>
          <button
            onClick={createRoom}
            className="flex items-center bg-[#20BD5F] py-2 px-9 rounded-[50px] text-white font-semibold font-Oxanium text-lg mt-5 w-[180px] hover:bg-[#128d4e] transition-all duration-200 ease-in-out"
          >
            <img src="/assets/letsgo.svg" alt="let's go" className="mr-3" />
            Let’s Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;

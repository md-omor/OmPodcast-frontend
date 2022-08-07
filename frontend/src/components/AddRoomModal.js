import React from "react";
import TextInput from "./shared/TextInput";

const AddRoomModal = () => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center ">
      <div className="w-[50%] max-w-[500px] bg-zinc-900">
        <div className="p-8 border-b-2 border-[#262626]">
          <h1 className="">Enter the topic to be disscussed</h1>
          <TextInput fullwidth="true" />
          <h1 className="">Room type</h1>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center justify-center bg-zinc-800 px-5 py-3 rounded-xl cursor-pointer">
              <img src="/assets/globe.png" alt="globe" className="" />
              <span className="">Open</span>
            </div>

            <div className="flex flex-col items-center justify-center bg-zinc-800 px-5 py-3 rounded-xl cursor-pointer">
              <img src="/assets/social.png" alt="social" className="" />
              <span className="">Open</span>
            </div>

            <div className="flex flex-col items-center justify-center bg-zinc-800 px-5 py-3 rounded-xl cursor-pointer">
              <img src="/assets/lock.png" alt="lock" className="" />
              <span className="">Open</span>
            </div>
          </div>
        </div>
        <div className="">Start a room, open to everyone</div>
      </div>
    </div>
  );
};

export default AddRoomModal;

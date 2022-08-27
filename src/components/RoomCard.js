import React from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/room/${room.id}`, {
          replace: true,
        })
      }
      className="bg-[#1d1d1d] p-5 rounded-3xl cursor-pointer mb-8 mr-6 w-[350px]"
    >
      <h3 className="font-bold font-Oxanium">{room.topic}</h3>

      <div
        className={`flex items-center relative ml-0 mr-5 my-4 ${
          room.speakers.length === 1 ? "speakers" : ""
        }`}
      >
        <div className="avatars">
          {room.speakers.map((speaker) => (
            <img
              src={speaker.avatar}
              key={speaker.id}
              className="w-[40px] h-[40px] rounded-[50%] object-cover absolute top-0 left-0 bg-[#1d1d1d]"
              alt="avatar"
            />
          ))}
        </div>
        <div className="ml-[100px] names">
          {room.speakers.map(({ name, id }) => (
            <div className="flex items-center" key={name}>
              <span className="pb-1 inline-block mr-1 font-medium font-Oxanium">
                {name}
              </span>
              <img src="/assets/chat-bubble.png" alt="chat-bubble" />
            </div>
          ))}
        </div>
      </div>
      <div className="items-center justify-end flex">
        <div className="flex justify-center items-center">
          <span className="font-bold text-sm lg:text-base font-Oxanium mr-1 mt-1">
            {room.speakers.length}
          </span>
          <img className="initial" src="/assets/user-icon.png" alt="user" />
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

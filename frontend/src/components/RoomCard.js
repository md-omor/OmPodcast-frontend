import React from "react";

const RoomCard = ({ room }) => {
  return (
    <div className="bg-[#1d1d1d] p-5 rounded-3xl cursor-pointer mb-8 mr-6 w-[350px]">
      <h3 className="font-bold font-Oxanium">{room.topic}</h3>
      <div className="ml-5">
        <div className="flex items-center relative mx-5 my-4 avatars">
          {room.speakers.map((speaker) => (
            <img
              src={speaker.avatar}
              key={speaker.id}
              className="w-[40px] h-[40px] rounded-[50%] object-cover absolute top-0 left-0 bg-[#1d1d1d]"
              alt="avatar"
            />
          ))}
        </div>
        <div className="ml-[100px]">
          {room.speakers.map(({ name, id }) => (
            <div className="flex items-center " key={id}>
              <span className="pb-1 inline-block mr-1 font-medium font-Oxanium">
                {name}
              </span>
              <img src="/assets/chat-bubble.png" alt="chat-bubble" />
            </div>
          ))}
        </div>
      </div>
      <div className="items-center justify-end flex">
        <span className="font-bold font-Oxanium mr-1 ">{room.totalPeople}</span>
        <img className="initial" src="/assets/user-icon.png" alt="user" />
      </div>
    </div>
  );
};

export default RoomCard;

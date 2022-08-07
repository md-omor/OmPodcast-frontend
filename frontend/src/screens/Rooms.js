import React, { useState } from "react";
import AddRoomModal from "../components/AddRoomModal";
import RoomCard from "../components/RoomCard";

const rooms = [
  {
    id: 1,
    topic: "Which framework best for frontend ?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/assets/monkey-avatar.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/assets/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 3,
    topic: "What’s new in machine learning?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/assets/monkey-avatar.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/assets/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 4,
    topic: "Why people use stack overflow?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/assets/monkey-avatar.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/assets/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 5,
    topic: "Artificial inteligence is the future?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/assets/monkey-avatar.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/assets/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 6,
    topic: "Artificial inteligence is the future?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/assets/monkey-avatar.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/assets/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 7,
    topic: "Artificial inteligence is the future?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/assets/monkey-avatar.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/assets/monkey-avatar.png",
      },
    ],
    totalPeople: 40,
  },
];

const Rooms = () => {
  const [showModal, setshowModal] = useState(false);

  const openModal = () => {
    setshowModal(true);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold font-Oxanium ">
              All voice rooms
            </span>
            <div className="bg-[#262626] ml-5 flex items-center py-0 px-3 min-w-[300px] rounded-3xl">
              <img src="assets/search.svg" alt="search" />
              <input
                type="text"
                className="bg-transparent border-none outline-none p-2 text-white w-full font-semibold font-Oxanium"
                placeholder="search rooms"
              />
            </div>
          </div>
          <div className="">
            <button
              onClick={openModal}
              className="flex items-center bg-[#20bd5f] px-5 py-1 rounded-3xl cursor-pointer text-white font-bold font-Oxanium hover:bg-[#128d4e] transition-all duration-200 ease-in-out"
            >
              <img src="assets/share.svg" alt="share" className="" />
              <span className="text-base ml-3 ">Start a room</span>
            </button>
          </div>
        </div>

        <div className="flex justify-start flex-wrap mt-[60px]">
          {rooms.map((room) => (
            <RoomCard ley={room.id} room={room} />
          ))}
        </div>
      </div>
      {showModal && <AddRoomModal />}
    </>
  );
};

export default Rooms;

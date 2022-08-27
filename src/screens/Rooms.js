import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddRoomModal from "../components/AddRoomModal";
import RoomCard from "../components/RoomCard";
import { getAllRooms } from "../http";

const Rooms = () => {
  const [showModal, setshowModal] = useState(false);
  const [rooms, setrooms] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      setrooms(data);

      console.log(data);
    };
    fetchRooms();
  }, []);

  const openModal = () => {
    setshowModal(true);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex items-center flex-wrap lg:justify-between justify-center">
          <div className="flex items-center">
            <span className="lg:text-xl text-base font-bold font-Oxanium ">
              All voice rooms
            </span>
            <div className="bg-[#262626] ml-5 flex items-center py-0 px-3 lg:min-w-[300px]  rounded-3xl">
              <img src="assets/search.svg" alt="search" />
              <input
                type="text"
                className="bg-transparent border-none outline-none p-2 text-white lg:w-full w-9/12 font-semibold font-Oxanium"
                placeholder="search rooms"
              />
            </div>
          </div>
          <div className="lg:m-0 mt-5">
            <button
              onClick={openModal}
              className="flex items-center bg-[#20bd5f] px-5 py-1 rounded-3xl cursor-pointer text-white font-bold font-Oxanium hover:bg-[#128d4e] transition-all duration-200 ease-in-out"
            >
              <img src="assets/share.svg" alt="share" className="" />
              <span className="text-base ml-3 ">Start a room</span>
            </button>
          </div>
        </div>

        <div className="flex lg:justify-start justify-center flex-wrap mt-[60px]">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
      {showModal && <AddRoomModal onClose={() => setshowModal(false)} />}
    </>
  );
};

export default Rooms;

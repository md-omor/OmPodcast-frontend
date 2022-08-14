import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useWebRTC } from "../hooks/useWebRTC";
import { getRoom } from "../http";

const Room = () => {
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { clients, provideRef } = useWebRTC(roomId, user);
  const navigate = useNavigate();
  const [room, setroom] = useState(null);
  const { roomName } = useSelector((state) => state.rooms);

  const leaveRoom = () => {
    navigate("/rooms", {
      replace: true,
    });
  };

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      setroom((prev) => data);
      console.log(data);
    };

    fetchRoom();
  }, [roomId]);

  return (
    <div>
      <div className="container mx-auto px-4 py-5">
        <button className="flex items-center bg-none mt-8" onClick={leaveRoom}>
          <img src="/assets/arrow-left.png" alt="left arrow" className="" />
          <span className="font-bold font-Oxanium text-white text-base ml-4">
            All voice rooms
          </span>
        </button>
      </div>

      <div className="roomPeopleWrap bg-zinc-800">
        <div className="flex items-center justify-between">
          <h1 className="font-bold font-Oxanium text-xl">{room?.topic}</h1>
          <div className="flex ">
            <button className="bg-zinc-700 ml-8 items-center px-4 py-3 flex rounded-3xl text-white transition-all duration-200 ease-in-out  hover:bg-[#333333]">
              <img src="/assets/palm.png" alt="hands up" />
            </button>
            <button
              onClick={leaveRoom}
              className="flex bg-zinc-700 ml-8 items-center px-4 py-3 rounded-3xl text-white transition-all duration-200 ease-in-out  hover:bg-[#333333]"
            >
              <img src="/assets/win.svg" alt="leave room icon" />
              <span className="font-semibold ml-2 font-Oxanium">
                Leave quietly
              </span>
            </button>
          </div>
        </div>
        <div className="mt-8 flex items-center flex-wrap gap-8 relative">
          {clients.map((client) => {
            return (
              <div className="flex flex-col items-center" key={client.id}>
                <div className="w-[90px] h-[90px] rounded-[50%] relative">
                  <audio
                    ref={(instance) => provideRef(instance, client.id)}
                    src=""
                    // controls
                    autoPlay
                  ></audio>
                  <img
                    src={client.avatar}
                    alt="avatar"
                    className="w-full h-full rounded-[50%]"
                  />
                  <button className="absolute bottom-0 -right-2 w-8 h-8 box-content rounded-[30px] p-1 shadow-[rgba(0,0,0,0.25)]">
                    {/* <img
                      src="/assets/mic.png"
                      alt="mic-mute"
                      className=""
                    /> */}
                    <img
                      src="/assets/mic-mute.svg"
                      alt="mic-mute"
                      className=""
                    />
                  </button>
                </div>
                <h1 className="font-semi  bold font-Oxanium mt-3">
                  {client.name}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Room;

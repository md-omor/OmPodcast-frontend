import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useWebRTC } from "../hooks/useWebRTC";

const Room = () => {
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { clients, provideRef } = useWebRTC(roomId, user);
  return (
    <div>
      <h1>All clients</h1>

      {clients.map((client) => {
        return (
          <div className="" key={client.id}>
            <audio
              ref={(instance) => provideRef(instance, client.id)}
              src=""
              controls
              autoPlay
            ></audio>
            <h1 className="">{client.name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Room;

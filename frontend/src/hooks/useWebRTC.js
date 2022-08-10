import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallback";

// const users = [
//   {
//     id: 1,
//     name: "Client 1",
//   },
//   {
//     id: 2,
//     name: "Client 2",
//   },
// ];

export const useWebRTC = (roomId, user) => {
  const [clients, setclients] = useStateWithCallback([]);

  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStreams = useRef(null);

  const addNewClients = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client.id === newClient.id);

      if (lookingFor === undefined) {
        setclients((existingCliets) => [...existingCliets, newClient], cb);
      }
    },
    [clients, setclients]
  );

  // Capture media
  useEffect(() => {
    const startCapture = async () => {
      localMediaStreams.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };

    startCapture().then(() => {
      addNewClients(user, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStreams.current;
        }
      });
    });
  }, []);

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  return { clients, provideRef };
};

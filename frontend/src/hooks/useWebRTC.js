import { freeice } from "freeice";
import { useCallback, useEffect, useRef } from "react";
import { ACTIONS } from "../actions";
import { socketInit } from "../socket";
import { useStateWithCallback } from "./useStateWithCallback";

export const useWebRTC = (roomId, user) => {
  const [clients, setclients] = useStateWithCallback([]);

  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStreams = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = socketInit();
  }, []);

  const addNewClients = useCallback(
    (newClient, cb) => {
      // if client already exists
      const lookingFor = clients.find((client) => client.id === newClient.id);

      // if client not exists then create new clients
      if (lookingFor === undefined) {
        setclients((existingCliets) => [...existingCliets, newClient], cb);
      }
    },
    [clients, setclients]
  );

  // Capture media
  useEffect(() => {
    // start capture with audio
    const startCapture = async () => {
      localMediaStreams.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };

    startCapture().then(() => {
      // add new clients
      addNewClients(user, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          // stop hearing my vioce
          localElement.volume = 0;
          //  when I play my audio use this localElement
          localElement.srcObject = localMediaStreams.current;
        }

        //  socket emit join socket io, it's mean join socket with another clients
        socket.current.emit(ACTIONS.JOIN, { roomId, user });
      });
    });
  }, []);

  useEffect(() => {
    // if all u se gapito
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      if (peerId in connections.current) {
        return console.warn(
          `You are already connected with ${peerId} (${user.name})`
        );
      }

      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice(),
      });

      // Handle new ice candidate
      connections.current[peerId].onicecandidate = (event) => {
        socket.current.emit(ACTIONS.RELAY_ICE, {
          peerId,
          icecandidate: event.candidate,
        });
      };

      // Hnadle on track on this connection
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClients(remoteUser, () => {
          if (audioElements.current[remoteUser.id]) {
            audioElements.current[remoteUser.id].srcObject = remoteStream;
          } else {
            let setteld = false;
            const interval = setInterval(() => {
              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                setteld = true;
              }
              if (setteld) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };

      // Add local track to remote connections
      localMediaStreams.current.getTracks().forEach((track) => {
        connections.current[peerId].addTrack(track, localMediaStreams.current);
      });

      // Create offers
      if (createOffer) {
        const offer = await connections.current[peerId].createOffer();

        // Send offer to another clients
        socket.current.emit(ACTIONS.REALY_SDP, {
          peerId,
          sessionDescription: offer,
        });
      }
    };
    socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

    return () => {};
  }, []);

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  return { clients, provideRef };
};

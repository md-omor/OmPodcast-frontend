import { useCallback, useEffect, useRef } from "react";
import { ACTIONS } from "../actions";
import { socketInit } from "../socket";
import { useStateWithCallback } from "./useStateWithCallback";

export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const socket = useRef(null);
  const localMediaStreams = useRef(null);
  const clientsRef = useRef(null);

  const addNewClient = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client.id === newClient.id);

      if (lookingFor === undefined) {
        setClients((existingClients) => [...existingClients, newClient], cb);
      }
    },
    [clients, setClients]
  );

  useEffect(() => {
    clientsRef.current = clients;
  }, [clients]);

  useEffect(() => {
    const chatInitialize = async () => {
      socket.current = socketInit();
      await captureMedia();

      addNewClient({ ...user, muted: true }, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStreams.current;
        }
      });

      async function captureMedia() {
        // Capturing the user audio.
        localMediaStreams.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      }

      // Handle the peer connection
      // const handleNewPeer = async ({
      //   peerId,
      //   createOffer,
      //   user: remoteUser,
      // }) => {
      //   if (peerId in connections.current) {
      //     return console.log(
      //       `You are already connected with ${peerId} (${user.name})`
      //     );
      //   }

      //   // Store it to connections
      //   connections.current[peerId] = new RTCPeerConnection({
      //     iceServers: freeice(),
      //   });

      //   // Handle new ice candidate on this peer connection
      //   connections.current[peerId].onicecandidate = (event) => {
      //     socket.current.emit(ACTIONS.RELAY_ICE, {
      //       peerId,
      //       icecandidate: event.candidate,
      //     });
      //   };

      //   // Handle on track event on this connection
      //   connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
      //     addNewClient({ ...remoteUser, muted: true }, () => {
      //       // get current users mute info
      //       const currentUser = clientsRef.current.find(
      //         (client) => client.id === user.id
      //       );
      //       if (currentUser) {
      //         socket.current.emit(ACTIONS.MUTE_INFO, {
      //           userId: user.id,
      //           roomId,
      //           isMute: currentUser.muted,
      //         });
      //       }
      //       if (audioElements.current[remoteUser.id]) {
      //         audioElements.current[remoteUser.id].srcObject = remoteStream;
      //       } else {
      //         let settled = false;
      //         const interval = setInterval(() => {
      //           if (audioElements.current[remoteUser.id]) {
      //             audioElements.current[remoteUser.id].srcObject = remoteStream;
      //             settled = true;
      //           }

      //           if (settled) {
      //             clearInterval(interval);
      //           }
      //         }, 300);
      //       }
      //     });
      //   };

        // Add connection to peer connections track
        localMediaStreams.current.getTracks().forEach((track) => {
          connections.current[peerId].addTrack(
            track,
            localMediaStreams.current
          );
        });

        // Create an offer if required
        if (createOffer) {
          const offer = await connections.current[peerId].createOffer();

          // Set as local description
          await connections.current[peerId].setLocalDescription(offer);

          // send offer to the server
          socket.current.emit(ACTIONS.RELAY_SDP, {
            peerId,
            sessionDescription: offer,
          });
        }
      };

      // remove connection from the site
      const handleRemovePeer = async ({ peerId, userId }) => {
        // Correction: peerID to peerId
        if (connections.current[peerId]) {
          connections.current[peerId].close();
        }

        delete connections.current[peerId];
        delete audioElements.current[peerId];
        setClients((list) => list.filter((c) => c.id !== userId));
      };

      const handleIceCandidate = async ({ peerId, icecandidate }) => {
        if (icecandidate) {
          connections.current[peerId].addIceCandidate(icecandidate);
        }
      };

      const setRemoteMedia = async ({
        peerId,
        sessionDescription: remoteSessionDescription,
      }) => {
        connections.current[peerId].setRemoteDescription(
          new RTCSessionDescription(remoteSessionDescription)
        );

        // If session descrition is offer then create an answer
        if (remoteSessionDescription.type === "offer") {
          const connection = connections.current[peerId];

          const answer = await connection.createAnswer();
          connection.setLocalDescription(answer);

          socket.current.emit(ACTIONS.RELAY_SDP, {
            peerId,
            sessionDescription: answer,
          });
        }
      };

      // mute functionality
      const handleSetMute = async (mute, userId) => {
        const clientIdx = clientsRef.current
          .map((client) => client.id)
          .indexOf(userId);
        const allConnectedClients = JSON.parse(
          JSON.stringify(clientsRef.current)
        );
        if (clientIdx > -1) {
          allConnectedClients[clientIdx].muted = mute;
          setClients(allConnectedClients);
        }
      };

      socket.current.on(ACTIONS.MUTE_INFO, ({ userId, isMute }) => {
        handleSetMute(isMute, userId);
      });

      socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);
      socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
      socket.current.on(ACTIONS.ICE_CANDIDATE, handleIceCandidate);
      socket.current.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);

      socket.current.on(ACTIONS.MUTE, ({ peerId, userId }) => {
        handleSetMute(true, userId);
      });

      socket.current.on(ACTIONS.UN_MUTE, ({ peerId, userId }) => {
        handleSetMute(false, userId);
      });

      socket.current.emit(ACTIONS.JOIN, {
        roomId,
        user,
      });
    };

    chatInitialize();

    return () => {
      localMediaStreams.current.getTracks().forEach((track) => track.stop());
      socket.current.emit(ACTIONS.LEAVE, { roomId });
      for (let peerId in connections.current) {
        connections.current[peerId].close();
        delete connections.current[peerId];
        delete audioElements.current[peerId];
      }
      socket.current.off(ACTIONS.ADD_PEER);
      socket.current.off(ACTIONS.REMOVE_PEER);
      socket.current.off(ACTIONS.ICE_CANDIDATE);
      socket.current.off(ACTIONS.SESSION_DESCRIPTION);
      socket.current.off(ACTIONS.MUTE);
      socket.current.off(ACTIONS.UN_MUTE);
    };
  }, []);

  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  // const handleMute = (isMute, userId) => {
  //   let settled = false;

  //   if (userId === user.id) {
  //     let interval = setInterval(() => {
  //       if (localMediaStreams.current) {
  //         localMediaStreams.current.getTracks()[0].enabled = !isMute;
  //         if (isMute) {
  //           socket.current.emit(ACTIONS.MUTE, {
  //             roomId,
  //             userId: user.id,
  //           });
  //         } else {
  //           socket.current.emit(ACTIONS.UN_MUTE, {
  //             roomId,
  //             userId: user.id,
  //           });
  //         }
  //         settled = true;
  //       }
  //       if (settled) {
  //         clearInterval(interval);
  //       }
  //     }, 200);

  //     // console.log((localMediaStreams.current.getTracks()[0].enabled = !isMute));
  //   }
  // };

  return {
    clients,
    provideRef,
    // handleMute,
  };
};

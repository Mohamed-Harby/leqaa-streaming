import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Peer from "simple-peer";
import { socket } from "./socket";

const createPeer = (userToSignal, callerId, stream) => {
  const peer = new Peer({
    initiator: true,
    trickle: true,
    stream,
  });
  peer.on("signal", (signal) => {
    socket.emit("offer", { userToSignal, callerId, signal });
  });
  return peer;
};

function addPeer(incomingSignal, callerId, stream) {
  const peer = new Peer({ initiator: false, trickle: true, stream });
  peer.on("signal", (signal) => {
    socket.emit("answer", { signal, callerId });
  });
  peer.signal(incomingSignal);
  return peer;
}

const Room = () => {
  const { roomId } = useParams();
  const userVideoRef = useRef();
  const [userStream, setUserStream] = useState();
  const [peers, setPeers] = useState([]);
  const [peersWithId, setPeersWithId] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  // event handlers for socket.io

  const onConnect = () => setIsConnected(true);
  const onDisconnect = () => setIsConnected(false);

  const onOtherUser = (otherUsers) => {
    console.log("otherUsers:", otherUsers);
    const peerConnections = []; // array of peer connections for each user in the room
    otherUsers.forEach((userSocketId) => {
      const peer = createPeer(userSocketId, socket.id, userStream); // create a peer connection for each user in the room and add it to the array of peer connections
      console.log("peer1: ", peer);
      setPeersWithId([...peersWithId, { peerId: userSocketId, peer }]);
      peerConnections.push(peer);
    });
    setPeers(peerConnections);
  };

  const onOffer = (offer) => {
    const peer = addPeer(offer.signal, offer.callerId, userStream);
    // console.log("peer2: ", peer);
    setPeersWithId([...peersWithId, { peerId: offer.callerId, peer }]);
    setPeers((users) => [...users, peer]);
  };
  const onAnswer = (answer) => {
    const item = peersWithId.find((p) => p.peerId === answer.id);
    item.peer.signal(answer.signal);
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;
        setUserStream(stream);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    console.log("socket: ", socket);

    // event listeners for socket.io
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("other-users", onOtherUser);
    socket.on("receiving-offer", onOffer);
    socket.on("receiving-answer", onAnswer);

    // tell other users in the room that you have joined
    socket.emit("join-room", roomId);

    // return () => { // cleanup function to remove event listeners for socket.io
    //   socket.off("connect", onConnect);
    //   socket.off("disconnect", onDisconnect);
    //   socket.off("other-users", onOtherUser);
    //   socket.off("receiving-offer", onOffer);
    //   socket.off("receiving-answer", onAnswer);
    // };
  }, []);

  return (
    <div style={containerStyle}>
      <video muted ref={userVideoRef} autoPlay playsInline style={videoStyle} />
      {console.log("peersWithId:", peersWithId)}
      {peersWithId.map((peerWithId, index) => {
        return <RemoteVideo key={index} peer={peerWithId.peer} />;
      })}
    </div>
    // <div>
    //   <ConnectionState isConnected={isConnected} />
    // </div>
  );
};
export default Room;

const RemoteVideo = ({ peer }) => {
  const videoRef = useRef();
  console.log("peerInside remonte: ", peer);
  useEffect(() => {
    peer.on("stream", (stream) => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  return <video playsInline autoPlay ref={videoRef} style={videoStyle} />;
};

const videoStyle = {
  height: "30%",
  width: "30%",
};

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
};

const ConnectionState = ({ isConnected }) => {
  return <p>State: {"" + isConnected}</p>;
};

import React, { useState } from "react";
import { v1 as uuid } from "uuid";

const CreateRoom = () => {
  const [roomId] = useState(uuid());

  const navigateToRoom = () => {
    window.location.href = `/room/${roomId}`;
  };

  return (
    <div style={roomWrapperStyle}>
      <button onClick={navigateToRoom} style={buttonStyle}>
        create room
      </button>
    </div>
  );
};

export default CreateRoom;

const roomWrapperStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const buttonStyle = {
  width: "250px",
  height: "50px",
  fontSize: "20px",
  fontWeight: "bold",
  borderRadius: "10px",
  backgroundColor: "#1d1f23",
  color: "#EAEAEA",
  cursor: "pointer",
  border: "2px solid #A379DE",
};

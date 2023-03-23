import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SIGNALING_SERVER;

export const socket = io(URL);

// export const socket = io(URL, {
//   transports: ["websocket"], // you need to explicitly tell it to use websockets
//   upgrade: false, // and disable long polling
// });

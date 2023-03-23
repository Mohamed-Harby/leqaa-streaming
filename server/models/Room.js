const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomId: { type: String, required: true },
  timeCreated: { type: Date, required: true },
  timeEnded: { type: Date, required: true },
  isBeingRecorded: { type: Boolean, required: true },
  users: { type: Array, required: true },
  numberOfUsers: { type: Number, required: true },
  isPrivate: { type: Boolean, required: true },
  isPasswordProtected: { type: Boolean, required: true },
  password: { type: String, required: true },
  isMeeting: { type: Boolean, required: true },
  isChatEnabled: { type: Boolean, required: true },
  isScreenSharingEnabled: { type: Boolean, required: true },
  isWhiteboardEnabled: { type: Boolean, required: true },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;

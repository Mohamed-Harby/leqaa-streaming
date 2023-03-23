const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: { type: String, required: true, minlength: 6 },
  email: { type: String, required: true, unique: true, trim: true },
  roomId: { type: String, required: true },
  timeJoined: { type: Date, required: true },
  timeLeft: { type: Date, required: true },
  isHost: { type: Boolean, required: true },
  isMuted: { type: Boolean, required: true },
  isVideoOn: { type: Boolean, required: true },
  isScreenSharing: { type: Boolean, required: true },
  isRecording: { type: Boolean, required: true },
  isTyping: { type: Boolean, required: true },
  isHandRaised: { type: Boolean, required: true },
  isPresenting: { type: Boolean, required: true },
  isSpeaking: { type: Boolean, required: true },
  sessionDescription: { type: Object, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

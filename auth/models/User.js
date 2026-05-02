// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  refreshToken: String
});

export default mongoose.model("User", UserSchema);

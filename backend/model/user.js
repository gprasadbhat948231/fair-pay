import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
});

const userModel = mongoose.model("user", UserSchema);

export default userModel;

import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  phone: { type: Number, require: true },
});

const userModel = mongoose.model("user", UserSchema);

export default userModel;

import mongoose from "mongoose";

const GroupSchema = mongoose.Schema({
  groupName: { type: String, required: true },
  groupMembers: { type: Array, ref: "User" },
  created_by: {
    type: String,
    required: true,
    ref: "User",
  },
  created_at: { type: Date, default: Date.now() },
  expenses: { type: Number, default: 0 },
});

const groupModal = mongoose.model("group", GroupSchema);

export default groupModal;

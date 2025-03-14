import mongoose from "mongoose";

const ContactsSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  created_at: { type: Date, default: Date.now() },
  created_by: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const contactsModel = mongoose.model("contact", ContactsSchema);

export default contactsModel;

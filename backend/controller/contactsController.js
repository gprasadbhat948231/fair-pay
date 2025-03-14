import Contacts from "../model/contacts.js";

export const createContact = async (req, res) => {
  try {
    const { name, phone, email, created_by } = req.body;
    const checkContact = await Contacts.findOne({ phone });
    if (checkContact) {
      return res.status(409).json({ message: "Contact already exist" });
    }
    const contact = new Contacts({ name, phone, email, created_by });
    await contact.save();
    res.status(201).json({ message: "Contact added successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getContactList = async (req, res) => {
  try {
    const { created_by } = req.body;
    if (!created_by) {
      return res.status(400).json({ message: "created_by is required" });
    }

    let contacts = await Contacts.find({
      created_by: created_by,
    }).lean();

    if (contacts.length > 0) {
      contacts = contacts.map((item) => {
        return { ...item, id: item._id, mutual: "-" };
      });
      return res
        .status(200)
        .json({ message: "Contacts fetched successfully", data: contacts });
    } else
      return res
        .status(200)
        .json({ message: "Contatcs fetched successfully", data: [] });
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "Please contact system admin" });
  }
};

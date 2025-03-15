import express from "express";
import {
  createContact,
  getContactList,
  updateContactList,
} from "../controller/contactsController.js";

const router = express.Router();

router.post("/create-contact", createContact);
router.post("/get-contacts", getContactList);
router.patch("/update-contact", updateContactList);

export default router;

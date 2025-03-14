import express from "express";
import { createContact, getContactList } from "../controller/contactsController.js";

const router = express.Router();

router.post("/create-contact", createContact);
router.post('/get-contacts', getContactList );

export default router;

import express from "express";
import {
  getGroupDetails,
  saveGroupDetails,
} from "../controller/groupController.js";

const router = express.Router();

router.post("/save-group", saveGroupDetails);
router.post("/get-groups", getGroupDetails);

export default router;

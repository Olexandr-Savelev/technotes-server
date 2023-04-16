import express from "express";
import {
  createNote,
  deleteNote,
  getNotes,
  uptadeNote,
} from "../controllers/notesController";

const router = express.Router();

router.route("/:userId").get(getNotes).post(createNote);
router.route("/:userId/:id").delete(deleteNote).patch(uptadeNote);

export default router;

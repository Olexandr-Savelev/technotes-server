import express from "express";
import { createNote, getNotes } from "../controllers/notesController";

const router = express.Router();

router.route("/:userId").get(getNotes).post(createNote);

export default router;

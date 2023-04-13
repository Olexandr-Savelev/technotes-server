import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Note from "../models/Note";

export const getNotes = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const notes = await Note.find({ user: userId }).lean().exec();

  res.status(200).json(notes).end();
});

export const createNote = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { title, text } = req.body;

  if (!title || !text) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const note = new Note({
    user: userId,
    title,
    text,
  });

  const newNote = await note.save();

  if (!newNote) {
    res.status(400);
    throw new Error("Can't create Note");
  }

  res.status(201).json(newNote).end();
});

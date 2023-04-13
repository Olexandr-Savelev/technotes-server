import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import asyncHandler from "express-async-handler";
import Note from "../models/Note";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find().select("-password").lean();

  res.status(200).json(users).end();
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password, roles } = req.body;

  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    res.status(409);
    throw new Error("All fields are required.");
  }

  const existingUser = await User.findOne({ username: username }).lean().exec();

  if (existingUser) {
    res.status(400);
    throw new Error("User with this name is already exist.");
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, password: hashPassword, roles });

  res.status(201).json(user).end();
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id).exec();

  if (!user) {
    res.status(400);
    throw new Error("User not found.");
  }

  const note = await Note.findOne({ user: id }).lean().exec();

  if (note) {
    res.status(400);
    throw new Error("This still have notes.");
  }

  const removedUser = await user.deleteOne();

  res
    .status(200)
    .json(
      `User ${removedUser.username} with ID ${removedUser._id} successfuly deleted.`
    )
    .end();
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username } = req.body;

  if (!username) {
    res.status(400);
    throw new Error("Provide new username.");
  }

  const existingUserName = await User.findOne({ username: username })
    .lean()
    .exec();

  if (existingUserName) {
    res.status(400);
    throw new Error("User with this name is already exist.");
  }

  const user = await User.findByIdAndUpdate(
    { _id: id },
    { username: username }
  );

  if (!user) {
    res.status(400);
    throw new Error("User is not exist.");
  }

  res.status(200).json(user).end();
});

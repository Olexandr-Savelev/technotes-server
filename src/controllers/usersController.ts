import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import asyncHandler from "express-async-handler";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find().select("-password").lean();

  res.status(200).json(users).end();
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new ErrorEvent("Username and password required.");
  }

  const existingUser = await User.findOne({ username: username }).lean();

  if (existingUser) {
    res.status(400);
    throw new Error("User with this name is already exist.");
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, password: hashPassword });

  res.status(201).json(user).end();
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const removedUser = await User.findByIdAndRemove(id);

  if (!removedUser) {
    res.status(400);
    throw new Error("Can't delete user.");
  }

  res.status(200).json(removedUser).end();
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username } = req.body;

  if (!username) {
    res.status(400);
    throw new Error("Provide new username.");
  }

  const existingUser = await User.findOne({ username: username }).lean();

  if (existingUser) {
    res.status(400);
    throw new Error("User with this name already exist.");
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

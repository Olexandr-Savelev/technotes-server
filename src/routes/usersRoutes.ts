import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/usersController";

const router = express.Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:id").delete(deleteUser).patch(updateUser);

export default router;

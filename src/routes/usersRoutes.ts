import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/usersController";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").delete(deleteUser).patch(updateUser);

export default router;

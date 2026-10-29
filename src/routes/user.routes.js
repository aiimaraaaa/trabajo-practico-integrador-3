import { Router } from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { param, body } from "express-validator";

export const userRouter = Router();

userRouter.use(authMiddleware, adminMiddleware); 

userRouter.get("/", getAllUsers);
userRouter.get("/:id", [param("id").isMongoId()], validate, getUserById);
userRouter.put("/:id", [
  param("id").isMongoId(),
  body("role").optional().isIn(["user", "admin"]),
], validate, updateUser);
userRouter.delete("/:id", [param("id").isMongoId()], validate, deleteUser);
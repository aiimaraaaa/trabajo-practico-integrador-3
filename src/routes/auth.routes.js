import { Router } from "express";
import { register, login, logout, getMyProfile, updateMyProfile } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerValidation, loginValidation } from "../middlewares/validations/auth.validation.js";
import { body } from "express-validator";

export const authRouter = Router();

authRouter.post("/register", registerValidation, validate, register);
authRouter.post("/login", loginValidation, validate, login);
authRouter.post("/logout", authMiddleware, logout);
authRouter.get("/profile", authMiddleware, getMyProfile);
authRouter.put("/profile", 
  authMiddleware, 
  [
    body("firstName").optional().trim().isLength({ min: 2, max: 50 }),
    body("lastName").optional().trim().isLength({ min: 2, max: 50 }),
  ], 
  validate, 
  updateMyProfile
);
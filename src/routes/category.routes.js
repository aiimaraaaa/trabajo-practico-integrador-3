import { Router } from "express";
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createCategoryValidation, updateCategoryValidation } from "../middlewares/validations/category.validation.js";

export const categoryRouter = Router();

categoryRouter.get("/", authMiddleware, getAllCategories);
categoryRouter.get("/:id", authMiddleware, updateCategoryValidation, validate, getCategoryById);


categoryRouter.post("/", authMiddleware, adminMiddleware, createCategoryValidation, validate, createCategory);
categoryRouter.put("/:id", authMiddleware, adminMiddleware, updateCategoryValidation, validate, updateCategory);
categoryRouter.delete("/:id", authMiddleware, adminMiddleware, updateCategoryValidation, validate, deleteCategory);
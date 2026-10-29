import { body, param } from "express-validator";
import { CategoryModel } from "../../models/category.model.js";

export const createCategoryValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 30 }).withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .custom(async (name) => {
      const cat = await CategoryModel.findOne({ name });
      if (cat) throw new Error("La categoría ya existe");
      return true;
    }),
  body("description")
    .optional()
    .isLength({ max: 200 }).withMessage("La descripción no puede superar los 200 caracteres"),
];

export const updateCategoryValidation = [
  param("id").isMongoId().withMessage("ID inválido"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 30 })
    .custom(async (name, { req }) => {
      const cat = await CategoryModel.findOne({ name });
      if (cat && cat._id.toString() !== req.params.id) throw new Error("Nombre de categoría en uso");
      return true;
    }),
  body("description").optional().isLength({ max: 200 }),
];
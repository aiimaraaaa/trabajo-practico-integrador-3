import { body, param } from "express-validator";
import { CategoryModel } from "../../models/category.model.js";
import { EventModel } from "../../models/event.model.js";

export const createEventValidation = [
  body("title")
    .trim()
    .notEmpty().withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 150 }).withMessage("El título debe tener entre 3 y 150 caracteres")
    .custom(async (title) => {
      const ev = await EventModel.findOne({ title });
      if (ev) throw new Error("Ya existe un evento con ese título");
      return true;
    }),

  body("description")
    .trim()
    .notEmpty().withMessage("La descripción es obligatoria")
    .isLength({ min: 20 }).withMessage("La descripción debe tener al menos 20 caracteres"),

  body("startDate").notEmpty().isISO8601().withMessage("Fecha de inicio inválida"),
  
  body("endDate")
    .notEmpty()
    .isISO8601().withMessage("Fecha de fin inválida")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("La fecha de fin debe ser posterior a la fecha de inicio");
      }
      return true;
    }),

  body("capacity").isInt({ min: 1 }).withMessage("La capacidad debe ser un entero mayor a 0"),
  body("price").optional().isFloat({ min: 0 }).withMessage("El precio no puede ser negativo"),
  body("status").optional().isIn(["scheduled", "cancelled", "finished"]).withMessage("Estado inválido"),

  // Validaciones embebidas (location)
  body("location.venue").trim().notEmpty().isLength({ min: 3, max: 100 }),
  body("location.address").trim().notEmpty().isLength({ min: 5, max: 150 }),
  body("location.city").trim().notEmpty().isLength({ min: 2, max: 50 }),

  // Validaciones de Array de referencias (N:M)
  body("categories")
    .optional()
    .isArray().withMessage("categories debe ser un array")
    .custom(async (categories) => {
      for (const id of categories) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new Error(`El ID ${id} no es válido`);
        const cat = await CategoryModel.findById(id);
        if (!cat) throw new Error(`La categoría ${id} no existe`);
      }
      return true;
    }),
];

export const updateEventValidation = [
  param("id").isMongoId().withMessage("ID inválido"),
  body("title").optional().trim().isLength({ min: 3, max: 150 }),
  body("description").optional().trim().isLength({ min: 20 }),
  body("startDate").optional().isISO8601(),
  body("endDate").optional().isISO8601(),
  body("capacity").optional().isInt({ min: 1 }),
  body("price").optional().isFloat({ min: 0 }),
  body("status").optional().isIn(["scheduled", "cancelled", "finished"]),
  body("location.venue").optional().trim().isLength({ min: 3, max: 100 }),
  body("location.address").optional().trim().isLength({ min: 5, max: 150 }),
  body("location.city").optional().trim().isLength({ min: 2, max: 50 }),
  body("categories").optional().isArray(),
];
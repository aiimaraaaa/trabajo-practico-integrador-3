import { body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const registerValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El username es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El username solo puede tener letras y números")
    .custom(async (username) => {
      const user = await UserModel.findOne({ username });
      if (user) throw new Error("El username ya está en uso");
      return true;
    }),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Formato de email inválido")
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) throw new Error("El email ya está en uso");
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe tener al menos una mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe tener al menos una minúscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe tener al menos un número"),

  body("role").optional().isIn(["user", "admin"]).withMessage("Rol inválido"),

  body("profile.firstName")
    .trim()
    .notEmpty()
    .withMessage("El firstName es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El firstName debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El firstName solo debe contener letras"),

  body("profile.lastName")
    .trim()
    .notEmpty()
    .withMessage("El lastName es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El lastName debe tener entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("El lastName solo debe contener letras"),

  body("profile.birthDate")
    .optional()
    .isISO8601()
    .withMessage("Fecha de nacimiento inválida")
    .custom((value) => {
      if (new Date(value) > new Date())
        throw new Error("La fecha de nacimiento no puede ser futura");
      return true;
    }),

  body("profile.phone")
    .optional()
    .isNumeric()
    .withMessage("El teléfono solo debe contener números")
    .isLength({ min: 8, max: 15 })
    .withMessage("El teléfono debe tener entre 8 y 15 dígitos"),
];

export const loginValidation = [
  body("email").trim().isEmail().withMessage("Email inválido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

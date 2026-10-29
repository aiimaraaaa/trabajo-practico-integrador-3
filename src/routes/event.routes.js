import { Router } from "express";
import { createEvent, getAllEvents, getMyEvents, getEventById, updateEvent, deleteEvent } from "../controllers/event.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerOrAdminMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createEventValidation, updateEventValidation } from "../middlewares/validations/event.validation.js";

export const eventRouter = Router();

eventRouter.use(authMiddleware); 

eventRouter.post("/", createEventValidation, validate, createEvent);
eventRouter.get("/", getAllEvents);
eventRouter.get("/my", getMyEvents);
eventRouter.get("/:id", updateEventValidation, validate, getEventById);


eventRouter.put("/:id", ownerOrAdminMiddleware, updateEventValidation, validate, updateEvent);
eventRouter.delete("/:id", ownerOrAdminMiddleware, validate, deleteEvent);
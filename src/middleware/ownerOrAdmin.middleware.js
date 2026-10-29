import { EventModel } from "../models/event.model.js";

export const ownerOrAdminMiddleware = async (req, res, next) => {
  try {
    const event = await EventModel.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Evento no encontrado" });

    if (req.user.role === "admin" || event.organizer.toString() === req.user.id) {
      return next();
    }
    return res.status(403).json({ msg: "Solo el organizador o admin pueden realizar esta acción" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
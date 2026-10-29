import { matchedData } from "express-validator";
import { EventModel } from "../models/index.js";

export const createEvent = async (req, res) => {
  try {
    const data = matchedData(req);

    data.organizer = req.user.id; 

    const newEvent = await EventModel.create(data);
    return res.status(201).json({ msg: "Evento creado", data: newEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find()
      .populate("organizer", "username email profile")
      .populate("categories", "name");
    return res.status(200).json({ data: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const events = await EventModel.find({ organizer: req.user.id })
      .populate("categories", "name");
    return res.status(200).json({ data: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id)
      .populate("organizer", "username email")
      .populate("categories", "name");
    if (!event) return res.status(404).json({ msg: "Evento no encontrado" });
    return res.status(200).json({ data: event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const data = matchedData(req);
    const updatedEvent = await EventModel.findByIdAndUpdate(req.params.id, data, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updatedEvent) return res.status(404).json({ msg: "Evento no encontrado" });
    return res.status(200).json({ msg: "Evento actualizado", data: updatedEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await EventModel.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ msg: "Evento no encontrado" });
    return res.status(200).json({ msg: "Evento eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
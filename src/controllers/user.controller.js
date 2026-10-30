import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { EventModel } from "../models/event.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ deletedAt: null })
      .select("-password")
      .populate("events");
    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      _id: req.params.id,
      deletedAt: null,
    })
      .select("-password")
      .populate("events");
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    return res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = matchedData(req);
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, data, {
      returnDocument: "after",
      runValidators: true,
    }).select("-password");

    if (!updatedUser)
      return res.status(404).json({ msg: "Usuario no encontrado" });
    return res
      .status(200)
      .json({ msg: "Usuario actualizado", data: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await EventModel.deleteMany({ organizer: id });

    const deletedUser = await UserModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { returnDocument: "after" },
    );

    if (!deletedUser)
      return res.status(404).json({ msg: "Usuario no encontrado" });

    return res
      .status(200)
      .json({
        msg: "Usuario eliminado lógicamente y sus eventos eliminados en cascada",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

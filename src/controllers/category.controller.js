import { matchedData } from "express-validator";
import { CategoryModel } from "../models/category.model.js";
import { EventModel } from "../models/event.model.js";

export const createCategory = async (req, res) => {
  try {
    const data = matchedData(req);
    const newCategory = await CategoryModel.create(data);
    return res.status(201).json({ msg: "Categoría creada", data: newCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find().populate("events");
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id).populate(
      "events",
    );
    if (!category)
      return res.status(404).json({ msg: "Categoría no encontrada" });
    return res.status(200).json({ data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const data = matchedData(req);
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      data,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    if (!updatedCategory)
      return res.status(404).json({ msg: "Categoría no encontrada" });
    return res
      .status(200)
      .json({ msg: "Categoría actualizada", data: updatedCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await EventModel.updateMany(
      { categories: id },
      { $pull: { categories: id } },
    );

    const deletedCategory = await CategoryModel.findByIdAndDelete(id);
    if (!deletedCategory)
      return res.status(404).json({ msg: "Categoría no encontrada" });

    return res
      .status(200)
      .json({ msg: "Categoría eliminada y removida de los eventos" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

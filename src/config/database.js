import mongoose from "mongoose";

export const startDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB correctamente");
  } catch (error) {
    console.log("Error al conectar a Mongodb", error);
  }
};
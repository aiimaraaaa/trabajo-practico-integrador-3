import mongoose, { mongo } from "mongoose";

export const startDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URLI);
        console.log("Conectado a MongoDB correctamente");
    } catch (error) {
        console.log("Error al conectar a Mongodb", error);
    }
};
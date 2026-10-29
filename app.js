import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config.js";
import { startDB } from "./src/config/database.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.listen(PORT, async () => {
    await startDB();
    console.log(`Servidor listo en el puerto ${PORT}`);
});
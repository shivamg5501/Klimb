import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import Router from "./routes/route.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/", Router);

Connection();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is up at ${PORT}`);
});

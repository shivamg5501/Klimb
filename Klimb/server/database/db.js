import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGODB_URI;

const Connection = () => {
  mongoose.connect(URI, { useNewUrlParser: true });

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
  });

  mongoose.connection.on("error", (error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
};

export default Connection;

import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    let conn;
    ENV_VARS.NODE_ENV = "production"
      ? (conn = await mongoose.connect(ENV_VARS.MONGO_URI))
      : (conn = await mongoose.connect("mongodb://localhost:27017/roc8"));

    console.log("MongoDB connected: " + conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MONGODB: " + error.message);
    process.exit(1); // 1 means there was an error, 0 means success
  }
};

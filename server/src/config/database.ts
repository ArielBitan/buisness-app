import mongoose from "mongoose";
import { injectData } from "./insertData";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(
      "Error connecting to the database or running operations:",
      error
    );
  }
}

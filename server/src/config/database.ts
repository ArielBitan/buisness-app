import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database.");
  } catch (error) {
    console.error(
      "Error connecting to the database or running operations:",
      error
    );
  }
}

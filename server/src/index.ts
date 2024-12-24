import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/user.route";
import businessRouter from "./routes/business.route";
import subscriptionRouter from "./routes/subscription.route";
import reviewRouter from "./routes/review.route";

import { connectToDatabase } from "./config/database";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/business", businessRouter);
app.use("/api/business/subscription", subscriptionRouter);
app.use("/api/reviews", reviewRouter);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });

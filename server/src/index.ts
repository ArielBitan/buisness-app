import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import userRouter from "./routes/user.route";
import businessRouter from "./routes/business.route";
import subscriptionRouter from "./routes/subscription.route";
import reviewRouter from "./routes/review.route";

import { connectToDatabase } from "./config/database";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "types/socket.types";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

const server = createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("subscribe", (businessId: string) => {
    console.log(`User subscribed to business: ${businessId}`);
    socket.join(businessId);
  });

  socket.on("unsubscribeAll", () => {
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
        console.log(`User unsubscribed from room: ${room}`);
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/user", userRouter);
app.use("/api/businesses", businessRouter);
app.use("/api/businesses", subscriptionRouter);
app.use("/api/reviews", reviewRouter);

// Connect to the database and start the server
connectToDatabase()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });

export { io };

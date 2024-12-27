import { createContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./userContext";
import { getSavedBusinesses } from "../services/user.service";
import { toast } from "@/hooks/use-toast";

// Create the SocketContext
export const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const socketInstance = io("http://localhost:3000");

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      console.warn("Socket disconnected");
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      console.warn("Socket disconnected on cleanup");
    };
  }, []);

  useEffect(() => {
    if (!user?._id || !socket) return;

    const subscribeToSavedBusinesses = async () => {
      try {
        const savedBusinesses = await getSavedBusinesses(user._id);
        if (savedBusinesses.length > 0) {
          savedBusinesses.forEach((business) => {
            socket.emit("subscribe", business._id);
            socket.on("businessUpdated", (data) => {
              if (data.businessId === business._id) {
                toast({
                  title: "Business update received:",
                  description: data.message,
                });
              }
            });
            socket.on("businessDeleted", (data) => {
              if (data.businessId === business._id) {
                toast({
                  title: "Business update received:",
                  description: data.message,
                });
              }
            });
          });
        }
      } catch (err) {
        console.error("Error subscribing to businesses:", err);
      }
    };

    subscribeToSavedBusinesses();

    return () => {
      if (socket) {
        socket.emit("unsubscribeAll");
      }
    };
  }, [user, socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

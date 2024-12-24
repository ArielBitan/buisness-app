import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/types/user.type";

interface UserContextType {
  user: IUser | null;
  fetchUser: () => void;
  setUser: (user: IUser) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  const fetchUser = () => {
    const token = document.cookie;
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  };

  const value = useMemo(
    () => ({
      user,
      fetchUser,
      setUser,
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

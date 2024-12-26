import api from "@/lib/api";
import { IBusiness } from "@/types/business.type";
import { IUser } from "@/types/user.type";

// Function to sign up a new user
export const signUpUser = async (userData: {
  email: string;
  password: string;
}): Promise<IUser> => {
  try {
    const { data } = await api.post<IUser>("/user/auth/signup", userData);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Function to get user details
export const getUserDetails = async (userId: string): Promise<IUser> => {
  try {
    const { data } = await api.get<IUser>(`/user/${userId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to get user saved businesses
export const getSavedBusinesses = async (
  userId: string
): Promise<IBusiness[]> => {
  try {
    const { data } = await api.get<IBusiness[]>(
      `/user/${userId}/saved-businesses`
    );

    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to log in a user
export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<{ token: string; user: IUser }> => {
  try {
    const { data } = await api.post<{ token: string; user: IUser }>(
      "/user/auth/login",
      credentials
    );
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Function to log out a user
export const logoutUser = async (): Promise<void> => {
  try {
    await api.post("/user/auth/logout");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;

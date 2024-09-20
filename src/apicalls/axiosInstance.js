import axios from "axios";

const refreshLocalStorage = () => {
  return localStorage.getItem("token");
};

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_API}`,
  headers: {
    Authorization: `Bearer ${refreshLocalStorage()}`,
  },
});

import { axiosInstance } from "./axiosInstance";

// register account
export const registerUser = async (payload) => {
  try {
    const res = await axiosInstance.post("/register", payload, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// login account
export const loginUser = async (payload) => {
  try {
    const res = await axiosInstance.post("/login", payload, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

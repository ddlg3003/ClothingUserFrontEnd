import { BASE_API_URL } from "../utils/globalVariables";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_API_URL,
});

const axiosConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getUserLogin = async (formData) => {
  try {
    const { data, status } = await api.post("/login", formData);

    return { data, status };
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (formData) => {
  try {
    const { data, status } = await api.post("/register", formData);

    return { data, status };
  } catch (error) {
    console.log(error);
  }
};

export const increaseCartItem = async (cartItem) => {
  try {
    const { data, status } = await api.post(
      "/user/cart/increase",
      cartItem,
      axiosConfig
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const decreaseCartItem = async (cartItem) => {
  try {
    const { data, status } = await api.post(
      "/user/cart/decrease",
      cartItem,
      axiosConfig
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

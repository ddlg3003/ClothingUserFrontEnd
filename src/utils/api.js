import { BASE_API_URL } from "../utils/globalVariables";
import axios from "axios";
import { axiosConfig } from "../utils/globalVariables";

const api = axios.create({
  baseURL: BASE_API_URL,
});

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
    // console.log(axiosConfig);
    const config = axiosConfig();
    const { data, status } = await api.post(
      "/user/cart/increase",
      cartItem,
      config,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const decreaseCartItem = async (cartItem) => {
  try {
    const config = axiosConfig();
    const { data, status } = await api.post(
      "/user/cart/decrease",
      cartItem,
      config,
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

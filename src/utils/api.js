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
      config
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
      config
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartItem = async (cartItem) => {
  try {
    const config = axiosConfig();

    const { data, status } = await api.post(
      "/user/cart/delete",
      cartItem,
      config
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addItemToCart = async (formData) => {
  try {
    const config = axiosConfig();

    const { data, status } = await api.post("/user/cart/add", formData, config);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addOrChangeAddress = async (formData, isChange) => {
  try {
    const apiString = isChange ? "user/address/change" : "user/address/create";
    const config = axiosConfig();

    const { data, status } = await api.post(apiString, formData, config);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAddress = async (id) => {
  try {
    const config = axiosConfig();

    const { data, status } = await api.delete(`user/address/${id}`, config);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (formData) => {
  try {
    const config = axiosConfig();

    const { data, status } = await api.post(
      "user/order/create",
      formData,
      config
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const changeProfile = async (formData) => {
  try {
    const config = axiosConfig();

    const { data, status } = await api.post(
      "user/profile/change",
      formData,
      config
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (formData) => {
  try {
    const config = axiosConfig();

    const { data, status } = await api.post(
      "user/changepassword",
      formData,
      config
    );

    return status;
  } catch (error) {
    console.log(error);
  }
};

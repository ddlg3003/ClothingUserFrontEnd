import { BASE_API_URL } from './globalVariables';
import axios from 'axios';

const api = axios.create({
  baseURL: BASE_API_URL,
});

export const getUserLogin = async (formData) => {
  try {
    const { data, status } = await api.post('/login', formData);

    return { data, status };
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (formData) => {
  try {
    const response = await api.post('/register', formData);

    return response;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

import { BASE_API_URL } from '../utils/globalVariables';

const baseQuery = {
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
};

export default baseQuery;

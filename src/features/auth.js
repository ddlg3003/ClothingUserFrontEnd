import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, ...user } = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { setUser, logout } = auth.actions;

export default auth.reducer;

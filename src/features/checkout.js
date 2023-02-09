import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCheckout: sessionStorage.getItem('cartItems') ? true : false,
};

export const checkout = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    updateCheckout: (state, action) => {
      state.isCheckout = true;
    },
  },
});

export const { updateCheckout } = checkout.actions;

export default checkout.reducer;

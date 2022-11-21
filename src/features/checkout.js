import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCheckout: false,
};

export const checkout = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        updateCheckout: (state, action) => {
            state.isCheckout = true;
        },
    }
});

export const { updateCheckout } = checkout.actions;

export default checkout.reducer;
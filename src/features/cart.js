import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
};

export const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCart: (state, action) => {
            // check if not logged in
            if (Array.isArray(action.payload)) {
                state.data = [...action.payload];
            }
        },
    }
});

export const { addToCart, increaseItem, decreaseItem, updateCart } = cart.actions;

export default cart.reducer;
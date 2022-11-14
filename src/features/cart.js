import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [
    ],
};

export const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.data = [...state.data, action.payload];
        },
        updateCart: (state, action) => {
            state.data = [...action.payload];
            console.log(Array.isArray(action.payload));
        },
    }
});

export const { addToCart, increaseItem, decreaseItem, updateCart } = cart.actions;

export default cart.reducer;
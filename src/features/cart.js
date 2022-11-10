import { createSlice } from '@reduxjs/toolkit';

const createData = (id, name, price, quantity, img, total) => {
    return { id, name, price, quantity, img, total };
}

const initialState = {
    data: [
        createData(
            0,
            "Kính chống nắng",
            100000,
            5,
            "https://demo.themefisher.com/aviato/images/shop/cart/cart-1.jpg",
            500000
        ),
        createData(
            1,
            "Váy body",
            200000,
            2,
            "https://demo.themefisher.com/aviato/images/shop/cart/cart-2.jpg",
            400000
        ),
        createData(
            2,
            "Khăn choàng",
            200000,
            2,
            "https://demo.themefisher.com/aviato/images/shop/cart/cart-3.jpg",
            400000
        ),
        createData(
            3,
            "Khăn choàng",
            150000,
            4,
            "https://demo.themefisher.com/aviato/images/shop/cart/cart-3.jpg",
            600000
        ),
    ],
};

export const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.data = [...state.data, action.payload];
        },
        increaseItem: (state, action) => {
            state.data[action.payload].quantity++;
            state.data[action.payload].total = state.data[action.payload].quantity * state.data[action.payload].price;
        },
        decreaseItem: (state, action) => {
            state.data[action.payload].quantity--;
            state.data[action.payload].total = state.data[action.payload].quantity * state.data[action.payload].price;
        },
    }
});

export const { addToCart, increaseItem, decreaseItem } = cart.actions;

export default cart.reducer;
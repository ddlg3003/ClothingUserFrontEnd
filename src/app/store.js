import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import cartReducer from '../features/cart';
import { clothing } from '../services/clothingBaseApis';
import authReducer from '../features/auth';
import addressReducer from '../features/address';
import checkoutReducer from '../features/checkout';

const store = configureStore({
    reducer: {
        [clothing.reducerPath]: clothing.reducer,
        cart: cartReducer,
        address: addressReducer,
        auth: authReducer,
        checkout: checkoutReducer,
    },  
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(clothing.middleware),
});

setupListeners(store.dispatch);

export default store;
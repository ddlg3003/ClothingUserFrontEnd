import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart';
import { clothing } from '../services/clothing';
import authReducer from '../features/auth';
import addressReducer from '../features/address';

export default configureStore({
    reducer: {
        [clothing.reducerPath]: clothing.reducer,
        cart: cartReducer,
        address: addressReducer,
        auth: authReducer,
    }
});
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart';
import { clothing } from '../services/clothing';
import authReducer from '../features/auth';

export default configureStore({
    reducer: {
        [clothing.reducerPath]: clothing.reducer,
        cart: cartReducer,
        auth: authReducer,
    }
});
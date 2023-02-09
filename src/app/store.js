import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { clothing } from '../services/clothingBaseApis';
import authReducer from '../features/auth';
import checkoutReducer from '../features/checkout';

const store = configureStore({
  reducer: {
    [clothing.reducerPath]: clothing.reducer,
    auth: authReducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clothing.middleware),
});

setupListeners(store.dispatch);

export default store;

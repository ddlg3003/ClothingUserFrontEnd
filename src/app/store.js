import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { clothing } from '../services/clothingBaseApis';
import authReducer from '../features/auth';
import checkoutReducer from '../features/checkout';
import imageReducer from '../features/image';

const store = configureStore({
  reducer: {
    [clothing.reducerPath]: clothing.reducer,
    auth: authReducer,
    checkout: checkoutReducer,
    image: imageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(clothing.middleware),
});

setupListeners(store.dispatch);

export default store;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
};

export const address = createSlice({
    name: 'address',
    initialState,
    reducers: {
        updateAddress: (state, action) => {
            // check if not logged in
            if (Array.isArray(action.payload)) {
                state.data = [...action.payload];
            }
        },
    }
});

export const { updateAddress } = address.actions;

export default address.reducer;
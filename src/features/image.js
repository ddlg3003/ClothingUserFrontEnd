import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: '',
  file: '',
};

export const image = createSlice({
  name: 'image',
  initialState,
  reducers: {
    updateImage: (state, action) => {
      state.content = action.payload.content;
      state.file = action.payload.file;
      console.log(state.content);
    },
  },
});

export const { updateImage } = image.actions;

export default image.reducer;

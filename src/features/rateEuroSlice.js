import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  eurorate: 1,
};

export const euroRateSlice = createSlice({
  name: "eurorate",
  initialState,
  reducers: {
    getEuroRate: (state, action) => {
      state.eurorate = action.payload;
      state.loading = false;
    },
  },
});

export const { getEuroRate } = euroRateSlice.actions;

export default euroRateSlice.reducer;

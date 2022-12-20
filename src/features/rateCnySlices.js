import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  cnyrate: 1,
};

export const cnyRateSlice = createSlice({
  name: "cnyrate",
  initialState,
  reducers: {
    getCnyRate: (state, action) => {
      state.cnyrate = action.payload;
      state.loading = false;
    },
  },
});

export const { getCnyRate } = cnyRateSlice.actions;

export default cnyRateSlice.reducer;

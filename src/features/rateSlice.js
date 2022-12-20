import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  rate: 0,
};

export const rateSlice = createSlice({
  name: "rate",
  initialState,

  reducers: {
    getRate: (state, action) => {
      state.rate = action.payload;
      state.loading = false;
    },
  },
});

export const { getRate } = rateSlice.actions;

export default rateSlice.reducer;

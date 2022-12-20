import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  usdtra: 1,
};

export const usdtRateSlice = createSlice({
  name: "usdtra",
  initialState,
  reducers: {
    getUsdtRa: (state, action) => {
      state.usdtra = action.payload;
      state.loading = false;
    },
  },
});

export const { getUsdtRa } = usdtRateSlice.actions;

export default usdtRateSlice.reducer;

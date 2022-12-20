import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  dollarate: 1,
};

export const dollarRateSlice = createSlice({
  name: "dollarate",
  initialState,

  reducers: {
    getDollarRate: (state, action) => {
      state.dollarate = action.payload;
      state.loading = false;
    },
  },
});

export const { getDollarRate } = dollarRateSlice.actions;

export default dollarRateSlice.reducer;

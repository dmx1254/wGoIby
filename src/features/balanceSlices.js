import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  balanceProducts: [],
};

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    getAllBalance: (state, action) => {
      state.balanceProducts = action.payload;
    },
  },
});

export const { getAllBalance } = balanceSlice.actions;

export default balanceSlice.reducer;

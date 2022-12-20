import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  products: null,
};

export const exchangeSlice = createSlice({
  name: "exchanges",
  initialState,
  reducers: {
    getAllExchanges: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },

    addNewExchange: (state, action) => {
      state.products = state.products.push(action.payload);
    },
  },
});

export const { getAllExchanges, addNewExchange } = exchangeSlice.actions;

export default exchangeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  soldes: null,
};

export const soldeSlice = createSlice({
  name: "soldes",
  initialState,
  reducers: {
    getAllSoldes: (state, action) => {
      state.soldes = action.payload;
      state.loading = false;
    },
  },
});

export const { getAllSoldes } = soldeSlice.actions;

export default soldeSlice.reducer;

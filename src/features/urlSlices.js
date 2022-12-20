import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  urlToSend: "",
};

export const urlToSendSlice = createSlice({
  name: "urlToSend",
  initialState,
  reducers: {
    addUrl: (state, action) => {
      state.loading = false;
      state.urlToSend = action.payload;
    },
  },
});

export const { addUrl } = urlToSendSlice.actions;

export default urlToSendSlice.reducer;

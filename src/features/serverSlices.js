import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  servers: [],
};

export const serversSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {
    addServers: (state, action) => {
      state.loading = false;
      state.servers = action.payload;
    },
  },
});

export const { addServers } = serversSlice.actions;

export default serversSlice.reducer;

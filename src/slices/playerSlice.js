import { createSlice } from "@reduxjs/toolkit";
import { fetchPlayers, fetchPlayerById } from "../thunks/playerThunks";

const playerSlice = createSlice({
  name: "players",
  initialState: {
    data: [],
    playerDetails: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.data = [];
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.data = [];
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPlayerById.pending, (state) => {
        state.status = "loading";
        state.playerDetails = null;
        state.error = null;
      })
      .addCase(fetchPlayerById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.playerDetails = action.payload;
      })
      .addCase(fetchPlayerById.rejected, (state, action) => {
        state.status = "failed";
        state.playerDetails = null;
        state.error = action.error.message;
      });
  },
});

export default playerSlice.reducer;

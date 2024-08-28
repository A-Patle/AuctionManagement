import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch all player details
export const fetchPlayers = createAsyncThunk("players/fetch", async () => {
  const response = await axios.get("https://grateful-sticky-puck.glitch.me/players");
  return response.data;
});

// Thunk to fetch player details by ID
export const fetchPlayerById = createAsyncThunk(
  "players/fetchById",
  async (id) => {
    const response = await axios.get(`https://grateful-sticky-puck.glitch.me/players/${id}`);
    return response.data;
  }
);

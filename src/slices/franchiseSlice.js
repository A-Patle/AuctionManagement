import { createSlice } from "@reduxjs/toolkit";
import franchiseReducer from "../reducers/franchiseReducers";

const franchiseSlice = createSlice({
  name: "franchise",
  initialState: {
    details: {},
  },
  reducers: franchiseReducer,
});

export const { updateFranchiseDetails } = franchiseSlice.actions;

export default franchiseSlice.reducer;

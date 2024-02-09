import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Filament } from "../types";

type FilamentsState = {
  value: Filament[];
};

const initialState: FilamentsState = {
  value: [],
};

export const filamentsSlice = createSlice({
  name: "filamentsSlice",
  initialState,
  reducers: {
    addFilament: (state, action: PayloadAction<Filament>) => {
      state.value.push(action.payload);
    },
  },
});

export const { addFilament } = filamentsSlice.actions;

export default filamentsSlice.reducer;

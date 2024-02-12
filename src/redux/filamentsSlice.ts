import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";

export type Filament = {
  id: string;
  name: string;
  price: number;
};

type FilamentsState = {
  value: Record<string, Filament>;
};

const initialState: FilamentsState = {
  value: {},
};

export const filamentsSlice = createSlice({
  name: "filamentsSlice",
  initialState,
  reducers: {
    saveFilament: (state, action: PayloadAction<Filament>) => {
      action.payload.id ||= uuidv4();
      state.value[action.payload.id] = action.payload;
    },
    removeFilament: (state, action: PayloadAction<Filament>) => {
      delete state.value[action.payload.id];
    },
  },
});

export const { saveFilament, removeFilament } = filamentsSlice.actions;

export default filamentsSlice.reducer;

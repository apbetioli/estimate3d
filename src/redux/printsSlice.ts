import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";

export type Print = {
  id: string;
  name: string;
  printer: string;
  filament: string;
  weight: number;
  time: number;
};

type PrintsState = {
  value: Record<string, Print>;
};

const initialState: PrintsState = {
  value: {},
};

export const printsSlice = createSlice({
  name: "printsSlice",
  initialState,
  reducers: {
    savePrint: (state, action: PayloadAction<Print>) => {
      action.payload.id ||= uuidv4();
      state.value[action.payload.id] = action.payload;
    },
    removePrint: (state, action: PayloadAction<Print>) => {
      delete state.value[action.payload.id];
    },
  },
});

export const { savePrint, removePrint } = printsSlice.actions;

export default printsSlice.reducer;

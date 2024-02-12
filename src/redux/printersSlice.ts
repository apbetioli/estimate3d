import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";

export type Printer = {
  id: string;
  name: string;
  power: number;
};

type PrintersState = {
  value: Record<string, Printer>;
};

const initialState: PrintersState = {
  value: {},
};

export const printersSlice = createSlice({
  name: "printersSlice",
  initialState,
  reducers: {
    savePrinter: (state, action: PayloadAction<Printer>) => {
      action.payload.id ||= uuidv4();
      state.value[action.payload.id] = action.payload;
    },
    removePrinter: (state, action: PayloadAction<Printer>) => {
      delete state.value[action.payload.id];
    },
  },
});

export const { savePrinter, removePrinter } = printersSlice.actions;

export default printersSlice.reducer;

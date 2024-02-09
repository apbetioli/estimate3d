import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Printer } from "../types";

type PrintersState = {
  value: Printer[];
};

const initialState: PrintersState = {
  value: [],
};

export const printersSlice = createSlice({
  name: "printersSlice",
  initialState,
  reducers: {
    addPrinter: (state, action: PayloadAction<Printer>) => {
      state.value.push(action.payload);
    },
  },
});

export const { addPrinter } = printersSlice.actions;

export default printersSlice.reducer;

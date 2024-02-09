import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Part = {
  printer: string;
  filament: string;
  weight: number;
  time: number;
};

type CalculateState = {
  addingPart: Part;
  parts: Part[];
};

const initialState: CalculateState = {
  addingPart: {
    printer: "",
    filament: "",
    weight: 0,
    time: 0,
  },
  parts: [],
};

export const calculateSlice = createSlice({
  name: "calculateSlice",
  initialState,
  reducers: {
    setPrinter: (state, action: PayloadAction<string>) => {
      state.addingPart.printer = action.payload;
    },
    setFilament: (state, action: PayloadAction<string>) => {
      state.addingPart.filament = action.payload;
    },
    setWeight: (state, action: PayloadAction<number>) => {
      state.addingPart.weight = action.payload;
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.addingPart.time = action.payload;
    },
    addPart: (state) => {
      state.parts.push(state.addingPart);
      state.addingPart = initialState.addingPart;
    },
  },
});

export const { setPrinter, setFilament, setWeight, setTime, addPart } =
  calculateSlice.actions;

export default calculateSlice.reducer;

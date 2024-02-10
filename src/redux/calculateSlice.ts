import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Print = {
  name: string;
  printer: string;
  filament: string;
  weight: number;
  time: number;
};

type CalculateState = {
  current: Print;
  prints: Print[];
};

const initialState: CalculateState = {
  current: {
    name: "",
    printer: "",
    filament: "",
    weight: 0,
    time: 0,
  },
  prints: [],
};

export const calculateSlice = createSlice({
  name: "calculateSlice",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.current.name = action.payload;
    },
    setPrinter: (state, action: PayloadAction<string>) => {
      state.current.printer = action.payload;
    },
    setFilament: (state, action: PayloadAction<string>) => {
      state.current.filament = action.payload;
    },
    setWeight: (state, action: PayloadAction<number>) => {
      state.current.weight = action.payload;
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.current.time = action.payload;
    },
    addPart: (state) => {
      state.prints.push(state.current);

      state.current.name = "";
      state.current.weight = 0;
      state.current.time = 0;
    },
  },
});

export const { setName, setPrinter, setFilament, setWeight, setTime, addPart } =
  calculateSlice.actions;

export default calculateSlice.reducer;

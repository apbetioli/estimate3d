import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type GeneralState = {
  energyCost: number;
  markup: number;
  failureMargin: number;
  transactionFees: number;
};

const initialState: GeneralState = {
  energyCost: 0,
  markup: 0,
  failureMargin: 0,
  transactionFees: 0,
};

export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setEnergyCost: (state, action: PayloadAction<number>) => {
      state.energyCost = action.payload;
    },
  },
});

export const { setEnergyCost } = generalSlice.actions;

export default generalSlice.reducer;

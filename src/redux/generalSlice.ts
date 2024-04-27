import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type GeneralState = {
  energyCost: number
  markup: number
  failureMargin: number
  transactionFee: number
  additionalCost: number
}

const initialState: GeneralState = {
  energyCost: 0,
  markup: 0,
  failureMargin: 0,
  transactionFee: 0,
  additionalCost: 0,
}

export const generalSlice = createSlice({
  name: 'generalSlice',
  initialState,
  reducers: {
    setEnergyCost: (state, action: PayloadAction<number>) => {
      state.energyCost = action.payload
    },
    setMarkup: (state, action: PayloadAction<number>) => {
      state.markup = action.payload
    },
    setFailureMargin: (state, action: PayloadAction<number>) => {
      state.failureMargin = action.payload
    },
    setTransactionFee: (state, action: PayloadAction<number>) => {
      state.transactionFee = action.payload
    },
    setAdditionalCost: (state, action: PayloadAction<number>) => {
      state.additionalCost = action.payload
    },
  },
})

export const {
  setEnergyCost,
  setMarkup,
  setFailureMargin,
  setTransactionFee,
  setAdditionalCost,
} = generalSlice.actions

export default generalSlice.reducer

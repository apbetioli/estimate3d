import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'


export type Printer = {
  id?: string
  name: string
  power: number
}

type PrintersState = Record<string, Printer>

const initialState: PrintersState = {}

export const printersSlice = createSlice({
  name: 'printersSlice',
  initialState,
  reducers: {
    savePrinter: (state, action: PayloadAction<Printer>) => {
      const printer = { ...action.payload, id: action.payload.id || nanoid() }
      state[printer.id] = printer
    },
    removePrinter: (state, action: PayloadAction<Printer>) => {
      delete state[action.payload.id!]
    },
  },
})

export const { savePrinter, removePrinter } = printersSlice.actions

export default printersSlice.reducer

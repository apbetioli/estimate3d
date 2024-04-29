import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'

type PrintersState = Record<string, Printer>

const initialState: PrintersState = {}

type DraftPrinter = Draft<Printer>

const createPrinter = (draft: DraftPrinter): Printer => {
  return { ...draft, id: draft.id || nanoid() }
}

export const printersSlice = createSlice({
  name: 'printersSlice',
  initialState,
  reducers: {
    savePrinter: (state, action: PayloadAction<DraftPrinter>) => {
      const printer = createPrinter(action.payload)
      state[printer.id] = printer
    },
    removePrinter: (state, action: PayloadAction<Printer>) => {
      delete state[action.payload.id]
    },
  },
})

export const { savePrinter, removePrinter } = printersSlice.actions

export default printersSlice.reducer

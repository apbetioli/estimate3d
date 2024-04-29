import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { reset } from './resetAction'

type PrintersState = {
  byId: Record<string, Printer>
}

const initialState: PrintersState = {
  byId: {},
}

type DraftPrinter = Draft<Printer>

export const createPrinter = (draft: DraftPrinter): Printer => {
  return { ...draft, id: draft.id || nanoid() }
}

export const printersSlice = createSlice({
  name: 'printers',
  initialState,
  reducers: {
    savePrinter: (state, action: PayloadAction<DraftPrinter>) => {
      const printer = createPrinter(action.payload)
      state.byId[printer.id] = printer
    },
    removePrinter: (state, action: PayloadAction<Printer['id']>) => {
      delete state.byId[action.payload]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reset, () => initialState)
  },
})

export const { savePrinter, removePrinter } = printersSlice.actions
export const printersReducer = printersSlice.reducer

export default printersSlice

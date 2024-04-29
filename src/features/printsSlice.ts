import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { removeFilament } from './filamentsSlice'
import { removePrinter } from './printersSlice'

type PrintsState = {
  byId: Record<string, Print>
}

const initialState: PrintsState = {
  byId: {},
}

type DraftPrint = Draft<Print>

export const createPrint = (draft: DraftPrint): Print => {
  return { ...draft, id: draft.id || nanoid() }
}

export const printsSlice = createSlice({
  name: 'prints',
  initialState,
  reducers: {
    savePrint: (state, action: PayloadAction<DraftPrint>) => {
      const print = createPrint(action.payload)
      state.byId[print.id] = print
    },
    removePrint: (state, action: PayloadAction<Print['id']>) => {
      delete state.byId[action.payload]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removePrinter, (state, action) => {
      Object.values(state.byId).forEach((print) => {
        if (print.printer === action.payload) {
          delete state.byId[print.id]
        }
      })
    })
    builder.addCase(removeFilament, (state, action) => {
      Object.values(state.byId).forEach((print) => {
        if (print.filament === action.payload) {
          delete state.byId[print.id]
        }
      })
    })
  },
})

export const { savePrint, removePrint } = printsSlice.actions
export const printsReducer = printsSlice.reducer

export default printsSlice

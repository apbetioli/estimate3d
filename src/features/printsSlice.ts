import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'

type PrintsState = Record<string, Print>

const initialState: PrintsState = {}

type DraftPrint = Draft<Print>

const createPrint = (draft: DraftPrint): Print => {
  return { ...draft, id: draft.id || nanoid() }
}

export const printsSlice = createSlice({
  name: 'prints',
  initialState,
  reducers: {
    savePrint: (state, action: PayloadAction<DraftPrint>) => {
      const print = createPrint(action.payload)
      state[print.id] = print
    },
    removePrint: (state, action: PayloadAction<Print>) => {
      delete state[action.payload.id]
    },
  },
})

export const { savePrint, removePrint } = printsSlice.actions
export const printsReducer = printsSlice.reducer

export default printsSlice

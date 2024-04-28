import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'

export type Print = {
  id?: string
  name: string
  printer: string
  filament: string
  weight: number
  time: number
}

type PrintsState = Record<string, Print>

const initialState: PrintsState = {}

export const printsSlice = createSlice({
  name: 'printsSlice',
  initialState,
  reducers: {
    savePrint: (state, action: PayloadAction<Print>) => {
      const print = { ...action.payload, id: action.payload.id || nanoid() }
      state[print.id] = print
    },
    removePrint: (state, action: PayloadAction<Print>) => {
      delete state[action.payload.id!]
    },
  },
})

export const { savePrint, removePrint } = printsSlice.actions

export default printsSlice.reducer

import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'

export type Filament = {
  id: string
  name: string
  price: number
}

type FilamentsState = Record<string, Filament>

const initialState: FilamentsState = {}

export const filamentsSlice = createSlice({
  name: 'filamentsSlice',
  initialState,
  reducers: {
    saveFilament: (state, action: PayloadAction<Filament>) => {
      const filament = { ...action.payload, id: action.payload.id || nanoid() }
      state[filament.id] = filament
    },
    removeFilament: (state, action: PayloadAction<Filament>) => {
      delete state[action.payload.id]
    },
  },
})

export const { saveFilament, removeFilament } = filamentsSlice.actions

export default filamentsSlice.reducer

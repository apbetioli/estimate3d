import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'

type FilamentsState = Record<string, Filament>

const initialState: FilamentsState = {}

type DraftFilament = Omit<Filament, 'id'> & { id?: string }

const createFilament = (draftFilament: DraftFilament): Filament => {
  return { ...draftFilament, id: draftFilament.id || nanoid() }
}

export const filamentsSlice = createSlice({
  name: 'filamentsSlice',
  initialState,
  reducers: {
    saveFilament: (state, action: PayloadAction<DraftFilament>) => {
      const filament = createFilament(action.payload)
      state[filament.id] = filament
    },
    removeFilament: (state, action: PayloadAction<Filament>) => {
      delete state[action.payload.id]
    },
  },
})

export const { saveFilament, removeFilament } = filamentsSlice.actions

export default filamentsSlice.reducer

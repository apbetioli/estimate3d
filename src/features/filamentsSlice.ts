import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { reset } from './resetAction'

type FilamentsState = {
  byId: Record<string, Filament>
}

const initialState: FilamentsState = {
  byId: {},
}

type DraftFilament = Draft<Filament>

export const createFilament = (draftFilament: DraftFilament): Filament => {
  return { ...draftFilament, id: draftFilament.id || nanoid() }
}

export const filamentsSlice = createSlice({
  name: 'filaments',
  initialState,
  reducers: {
    saveFilament: (state, action: PayloadAction<DraftFilament>) => {
      const filament = createFilament(action.payload)
      state.byId[filament.id] = filament
    },
    removeFilament: (state, action: PayloadAction<Filament['id']>) => {
      delete state.byId[action.payload]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reset, () => initialState)
  },
})

export const { saveFilament, removeFilament } = filamentsSlice.actions
export const filamentsReducer = filamentsSlice.reducer

export default filamentsSlice

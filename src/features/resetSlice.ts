import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const resetSlice = createSlice({
  name: 'reset',
  initialState,
  reducers: {
    reset: () => initialState,
  },
})

export const resetReducer = resetSlice.reducer
export const { reset } = resetSlice.actions

export default resetSlice

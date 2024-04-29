import { describe, expect, it } from 'vitest'
import {
  createFilament,
  filamentsReducer,
  saveFilament,
} from './filamentsSlice'

describe('filamentsSlice', () => {
  const initialState = {
    1: createFilament({
      name: 'Prusament PLA Prusa Galaxy Black 2kg',
      price: 49.99,
    }),
    2: createFilament({
      name: 'Prusament PETG Prusa Orange 2kg',
      price: 49.99,
    }),
  }

  it(`should add a filament when ${saveFilament.toString()} is dispatched`, () => {
    const filament = createFilament({
      name: 'PLA+ Lithophane filament 1kg',
      price: 26.49,
    })
    const action = saveFilament(filament)
    const newState = filamentsReducer(initialState, action)
    expect(Object.entries(newState).length).toBe(3)
    expect(newState[filament.id]).toEqual(filament)
  })
})

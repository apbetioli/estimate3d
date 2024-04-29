import { describe, expect, it } from 'vitest'
import { createPrinter, printersReducer, savePrinter } from './printersSlice'

describe('printersSlice', () => {
  const initialState = {
    byId: {
      '1': createPrinter({
        name: 'Prusa MK4',
        power: 400,
      }),
      '2': createPrinter({
        name: 'Prusa Mini',
        power: 200,
      }),
    },
  }

  it(`should add a printer when ${savePrinter.toString()} is dispatched`, () => {
    const printer = createPrinter({
      name: 'Creality Ender 3',
      power: 300,
    })
    const action = savePrinter(printer)
    const newState = printersReducer(initialState, action)
    expect(Object.entries(newState.byId).length).toBe(3)
    expect(newState.byId[printer.id]).toEqual(printer)
  })
})

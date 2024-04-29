import { describe, expect, it } from 'vitest'
import { removePrinter } from './printersSlice'
import { createPrint, printsReducer, savePrint } from './printsSlice'

describe('printsSlice', () => {
  const initialState = {
    byId: {
      '1': createPrint({
        name: 'Headset support',
        filament: '1',
        printer: '2',
        time: 10,
        weight: 100,
      }),
    },
  }

  it(`should add a print when ${savePrint.toString()} is dispatched`, () => {
    const print = createPrint({
      name: 'Towel hanger',
      filament: '1',
      printer: '2',
      time: 10,
      weight: 100,
    })
    const action = savePrint(print)
    const newState = printsReducer(initialState, action)
    expect(Object.entries(newState.byId).length).toBe(2)
    expect(newState.byId[print.id]).toEqual(print)
  })

  it.skip(`should remove a print when related ${removePrinter.toString()} is dispatched`, () => {
    const action = removePrinter('2')
    const newState = printsReducer(initialState, action)
    expect(newState).toEqual({ byId: {} })
  })
})

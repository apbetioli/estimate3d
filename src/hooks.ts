import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

import { useCallback, useMemo } from 'react'
import type { TypedUseSelectorHook } from 'react-redux'
import { removeFilament, saveFilament } from './features/filamentsSlice'
import { removePrinter, savePrinter } from './features/printersSlice'
import { removePrint, savePrint } from './features/printsSlice'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const usePrinters = () => {
  const dispatch = useAppDispatch()
  const printersMap = useAppSelector((state) => state.printers.byId)
  const printers = useMemo(() => Object.values(printersMap), [printersMap])
  const findById = useCallback((id: string) => printersMap[id], [printersMap])
  const save = useCallback(
    (printer: Printer) => dispatch(savePrinter(printer)),
    [dispatch],
  )
  const remove = useCallback(
    (printer: Printer) => dispatch(removePrinter(printer.id)),
    [dispatch],
  )
  return useMemo(
    () => ({ printers, findById, save, remove }),
    [printers, findById, save, remove],
  )
}

export const useFilaments = () => {
  const dispatch = useAppDispatch()
  const filamentsMap = useAppSelector((state) => state.filaments.byId)
  const filaments = useMemo(() => Object.values(filamentsMap), [filamentsMap])
  const findById = useCallback((id: string) => filamentsMap[id], [filamentsMap])
  const save = useCallback(
    (filament: Filament) => dispatch(saveFilament(filament)),
    [dispatch],
  )
  const remove = useCallback(
    (filament: Filament) => dispatch(removeFilament(filament.id)),
    [dispatch],
  )
  return useMemo(
    () => ({ filaments, findById, save, remove }),
    [filaments, findById, save, remove],
  )
}

export const usePrints = () => {
  const dispatch = useAppDispatch()
  const printsMap = useAppSelector((state) => state.prints.byId)
  const prints = useMemo(() => Object.values(printsMap), [printsMap])
  const findById = useCallback((id: string) => printsMap[id], [printsMap])
  const save = useCallback(
    (print: Print) => dispatch(savePrint(print)),
    [dispatch],
  )
  const remove = useCallback(
    (print: Print) => dispatch(removePrint(print.id)),
    [dispatch],
  )
  return useMemo(
    () => ({ prints, findById, save, remove }),
    [prints, findById, save, remove],
  )
}

export const useResults = () => {
  const { prints } = usePrints()
  const { findById: findPrinter } = usePrinters()
  const { findById: findFilament } = useFilaments()
  const general = useAppSelector((state) => state.general)

  const { weight, time, filamentCost, energyCost } = prints
    .map((print) => {
      const { power } = findPrinter(print.printer)
      const { price } = findFilament(print.filament)
      const weight = print.weight * print.quantity
      const time = print.time * print.quantity
      return {
        weight,
        time,
        filamentCost: weight * (price / 1000),
        energyCost: (time * power * general.energyCost) / (60 * 1000),
      }
    })
    .reduce(
      (acc, curr) => {
        acc.weight += curr.weight
        acc.time += curr.time
        acc.energyCost += curr.energyCost
        acc.filamentCost += curr.filamentCost
        return acc
      },
      {
        weight: 0,
        time: 0,
        filamentCost: 0,
        energyCost: 0,
      },
    )

  const totalPrint = energyCost + filamentCost
  const failureCharge = (general.failureMargin / 100) * totalPrint
  const totalCost = general.additionalCost + failureCharge + totalPrint
  const profit = (general.markup / 100) * totalCost
  const price = totalCost + profit
  const transactionFee = (general.transactionFee / 100) * price
  const finalPrice = price + transactionFee

  return {
    weight,
    time,
    filamentCost,
    energyCost,
    totalPrint,
    failureCharge,
    totalCost,
    profit,
    price,
    transactionFee,
    finalPrice,
  }
}

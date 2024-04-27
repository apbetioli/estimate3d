import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

import type { TypedUseSelectorHook } from "react-redux";
import { Filament, removeFilament, saveFilament } from "./filamentsSlice";
import { Printer, removePrinter, savePrinter } from "./printersSlice";
import { Print, removePrint, savePrint } from "./printsSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const usePrinters = () => {
  const dispatch = useAppDispatch();
  const printersMap = useAppSelector((state) => state.printers.value);
  const findById = (id: string) => printersMap[id];
  const save = (printer: Printer) => dispatch(savePrinter(printer));
  const remove = (printer: Printer) => dispatch(removePrinter(printer));
  return { printers: Object.values(printersMap), findById, save, remove };
};

export const useFilaments = () => {
  const dispatch = useAppDispatch();
  const filamentsMap = useAppSelector((state) => state.filaments.value);
  const findById = (id: string) => filamentsMap[id];
  const save = (filament: Filament) => dispatch(saveFilament(filament));
  const remove = (filament: Filament) => dispatch(removeFilament(filament));
  return { filaments: Object.values(filamentsMap), findById, save, remove };
};

export const usePrints = () => {
  const dispatch = useAppDispatch();
  const printsMap = useAppSelector((state) => state.prints.value);
  const findById = (id: string) => printsMap[id];
  const save = (print: Print) => dispatch(savePrint(print));
  const remove = (print: Print) => dispatch(removePrint(print));
  return { prints: Object.values(printsMap), findById, save, remove };
};

export const useResults = () => {
  const { prints } = usePrints();
  const { findById: findPrinter } = usePrinters();
  const { findById: findFilament } = useFilaments();
  const general = useAppSelector((state) => state.general);

  const { weight, time, filamentCost, energyCost } = prints
    .map((print) => {
      const printer = findPrinter(print.printer) || { power: 0 };
      const filament = findFilament(print.filament) || { price: 0 };
      return {
        weight: print.weight,
        time: print.time,
        filamentCost: print.weight * (filament.price / 1000),
        energyCost:
          (print.time * printer.power * general.energyCost) / (60 * 1000),
      };
    })
    .reduce(
      (acc, curr) => {
        acc.weight += curr.weight;
        acc.time += curr.time;
        acc.energyCost += curr.energyCost;
        acc.filamentCost += curr.filamentCost;
        return acc;
      },
      {
        weight: 0,
        time: 0,
        filamentCost: 0,
        energyCost: 0,
      },
    );

  const totalPrint = energyCost + filamentCost;
  const failureCharge = (general.failureMargin / 100) * totalPrint;
  const totalCost = general.additionalCost + failureCharge + totalPrint;
  const profit = (general.markup / 100) * totalCost;
  const price = totalCost + profit;
  const transactionFee = (general.transactionFee / 100) * price;
  const finalPrice = price + transactionFee;

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
  };
};

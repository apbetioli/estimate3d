import calculate from "./calculateSlice";
import { configureStore } from "@reduxjs/toolkit";
import filaments from "./filamentsSlice";
import general from "./generalSlice";
import printers from "./printersSlice";

const store = configureStore({
  reducer: {
    printers,
    filaments,
    general,
    calculate,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
//Inferred type { printers: PrintersState }
export type AppDispatch = typeof store.dispatch;

export default store;

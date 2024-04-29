import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { filamentsReducer } from './features/filamentsSlice'
import { generalReducer } from './features/generalSlice'
import { printersReducer } from './features/printersSlice'
import { printsReducer } from './features/printsSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  general: generalReducer,
  printers: printersReducer,
  filaments: filamentsReducer,
  prints: printsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
//Inferred type { printers: PrintersState }
export type AppDispatch = typeof store.dispatch

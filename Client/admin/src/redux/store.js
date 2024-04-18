import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from "./userRedux"
import productReducer from './productRedux'
import orderReducer from './orderRedux'
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const rootReducer = persistReducer(persistConfig, combineReducers({user: userReducer, product: productReducer, order: orderReducer}))
  export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
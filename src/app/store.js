import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import languageReducer from "../features/languageSliceSelected";
import userReducer from "../features/userSlice";
import rateReducer from "../features/rateSlice";
import serversReducer from "../features/serverSlices";
import balanceReducer from "../features/balanceSlices";
import euroRateReducer from "../features/rateEuroSlice";
import dollarRateReducer from "../features/rateDollarSlices";
import usdtRaChangeReducer from "../features/rateUsdtSlices";
import soldeReducer from "../features/soldeSlices";
import exchangesReducer from "../features/kamasExchangeSlices";
import cnyRateReducer from "../features/rateCnySlices";
import urlReducer from "../features/urlSlices";
import orderReducer from "../features/ordersSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducers = combineReducers({
  language: languageReducer,
  user: userReducer,
  rate: rateReducer,
  servers: serversReducer,
  balance: balanceReducer,
  exchanges: exchangesReducer,
  eurorate: euroRateReducer,
  usdtra: usdtRaChangeReducer,
  dollarate: dollarRateReducer,
  cnyrate: cnyRateReducer,
  soldes: soldeReducer,
  urlToSend: urlReducer,
  orders: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export let persistor = persistStore(store);

// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
// import { baseApi } from "./api/baseApi";
// import authReducer from "@/redux/features/auth/authSlice";
// import userReducer from "@/redux/features/user/userSlice";
import userReducer from "@/store/Slices/user/userSlice";
import {
  persistReducer,
  persistStore,
  PERSIST,
  REHYDRATE,
  PAUSE,
  FLUSH,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";

// Persist config for authentication
const persistConfig = {
  key: "auth",
  storage,
  // whitelist: ["token", "user"],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE, PAUSE, FLUSH, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

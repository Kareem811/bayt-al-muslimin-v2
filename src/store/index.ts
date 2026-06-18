import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./slices/audioSlice";
import settingsReducer from "./slices/settingsSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      audio: audioReducer,
      settings: settingsReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

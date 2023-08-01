import { configureStore } from "@reduxjs/toolkit";

import drawingBoardReducer from "./feature/drawingBoardSlice";
import audioReducer from "./feature/audioSlice";

export const store = configureStore({
  reducer: {
    drawingBoard: drawingBoardReducer,
    audio: audioReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

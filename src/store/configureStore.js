import { configureStore } from "@reduxjs/toolkit";

import drawingBoardReducer from "./feature/drawingBoardSlice";
import audioReducer from "./feature/audioSlice";

export default configureStore({
  reducer: {
    drawingBoard: drawingBoardReducer,
    audio: audioReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

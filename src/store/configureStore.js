import { configureStore } from "@reduxjs/toolkit";

import drawingBoardReducer from "../store/feature/drawingBoardSlice";

export default configureStore({
  reducer: {
    drawingBoard: drawingBoardReducer,
  },
});

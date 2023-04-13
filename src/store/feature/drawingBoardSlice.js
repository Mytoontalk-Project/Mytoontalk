import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  currentTool: "pen",
  pen: {
    color: "#000000",
    width: 4,
    opacity: 1,
  },
  eraser: {
    color: "#ffffff",
    width: 4,
    opacity: 1,
  },
  color: "#000000",
  page: {
    1: {
      drawingData: [],
      audioData: [],
    },
    2: {
      drawingData: [],
      audioData: [],
    },
    3: {
      drawingData: [],
      audioData: [],
    },
    4: {
      drawingData: [],
      audioData: [],
    },
  },
};

export const drawingBoardSlice = createSlice({
  name: "drawingBoard",
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { setColor } = drawingBoardSlice.actions;

export const selectColor = (state) => state.drawingBoard.color;

export default drawingBoardSlice.reducer;

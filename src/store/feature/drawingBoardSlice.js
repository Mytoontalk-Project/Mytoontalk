import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
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
    setTitle: (state, action) => {
      state.title = action.payload;
    }
  },
});

export const { setColor, setTitle } = drawingBoardSlice.actions;

export const selectColor = (state) => state.drawingBoard.color;
export const selectTitle = (state) => state.drawingBoard.title;

export default drawingBoardSlice.reducer;

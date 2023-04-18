import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  currentPage: 1,
  currentTool: "pen",
  pen: {
    width: 3,
    color: "#000000",
  },
  eraser: {
    color: "#ffffff",
    width: 5,
  },
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
    setPenColor: (state, action) => {
      state.pen.color = action.payload;
    },
    setPenWidth: (state, action) => {
      state.pen.width = action.payload;
    },
    setEraserWidth: (state, action) => {
      state.eraser.width = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentTool: (state, action) => {
      state.currentTool = action.payload;
    },
    /* setPage: (state, action) => {
      state.page = action.payload;
    } */
  },
});

export const {
  setCurrentPage,
  setTitle,
  setPenColor,
  setPenWidth,
  setEraserWidth,
  setCurrentTool
} = drawingBoardSlice.actions;

export const selectPenColor = (state) => state.drawingBoard.pen.color;
export const selectPenWidth = (state) => state.drawingBoard.pen.width;
export const selectEraserColor = (state) => state.drawingBoard.eraser.color;
export const selectEraserWidth = (state) => state.drawingBoard.eraser.width;
export const selectTitle = (state) => state.drawingBoard.title;
export const selectCurrentPage = (state) => state.drawingBoard.currentPage;
export const selectCurrentTool = (state) => state.drawingBoard.currentTool;
export const selectPage = (state) => state.drawingBoard.page;

export default drawingBoardSlice.reducer;

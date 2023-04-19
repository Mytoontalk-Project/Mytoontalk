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
      redoData: [],
      imageUrl: "",
    },
    2: {
      drawingData: [],
      redoData: [],
      imageUrl: "",
    },
    3: {
      drawingData: [],
      redoData: [],
      imageUrl: "",
    },
    4: {
      drawingData: [],
      redoData: [],
      imageUrl: "",
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
    setPagePath: (state, action) => {
      const { currentPage, paths } = action.payload;
      state.page[currentPage].drawingData = paths;
    },
    setPageImageUrl: (state, action) => {
      const { currentPage, imageUrl } = action.payload;
      state.page[currentPage].imageUrl = imageUrl;
    },
    setPathUndo: (state, action) => {
      const { currentPage, restPaths, lastPath } = action.payload;
      state.page[currentPage].drawingData = restPaths;
      state.page[currentPage].redoData = [
        ...state.page[currentPage].redoData,
        lastPath,
      ];
    },
    setPathRedo: (state, action) => {
      const { currentPage, restPaths, lastPath } = action.payload;
      state.page[currentPage].drawingData = [
        ...state.page[currentPage].drawingData,
        lastPath,
      ];
      state.page[currentPage].redoData = restPaths;
    },
    createNewCanvas: (state, action) => {
      state.title = action.payload;
      state.currentPage = 1;
      state.currentTool = null;
      state.page = {
        1: {
          drawingData: [],
          redoData: [],
        },
        2: {
          drawingData: [],
          redoData: [],
        },
        3: {
          drawingData: [],
          redoData: [],
        },
        4: {
          drawingData: [],
          redoData: [],
        },
      };
    },
  },
});

export const {
  setPageImageUrl,
  createNewCanvas,
  setCurrentPage,
  setTitle,
  setPenColor,
  setPenWidth,
  setEraserWidth,
  setCurrentTool,
  setPagePath,
  setPathUndo,
  setPathRedo,
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

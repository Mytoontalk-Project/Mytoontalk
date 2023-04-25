import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  titleList: [],
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
      base64File: "",
    },
    2: {
      drawingData: [],
      redoData: [],
      base64File: "",
    },
    3: {
      drawingData: [],
      redoData: [],
      base64File: "",
    },
    4: {
      drawingData: [],
      redoData: [],
      base64File: "",
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
    setPageBase64File: (state, action) => {
      const { currentPage, base64File } = action.payload;
      state.page[currentPage].base64File = base64File;
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
      state.currentTool = "pen";
      state.pen.width = 3;
      state.pen.color = "#000000";
      state.eraser.width = 5;
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
    setTitleList: (state, action) => {
      state.titleList = action.payload;
    },
    pushTitleList: (state, action) => {
      state.titleList = [...state.titleList, action.payload];
    }
  },
});

export const {
  setPageBase64File,
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
  setTitleList,
  pushTitleList,
} = drawingBoardSlice.actions;

export const selectPenColor = (state) => state.drawingBoard.pen.color;
export const selectPenWidth = (state) => state.drawingBoard.pen.width;
export const selectEraserColor = (state) => state.drawingBoard.eraser.color;
export const selectEraserWidth = (state) => state.drawingBoard.eraser.width;
export const selectTitle = (state) => state.drawingBoard.title;
export const selectCurrentPage = (state) => state.drawingBoard.currentPage;
export const selectCurrentTool = (state) => state.drawingBoard.currentTool;
export const selectPage = (state) => state.drawingBoard.page;
export const selectTitleList = (state) => state.drawingBoard.titleList;

export default drawingBoardSlice.reducer;

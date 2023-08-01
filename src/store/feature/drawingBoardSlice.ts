import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../configureStore";

import { DrawingBoardData, DrawingData } from "../../types/drawingType";

const initialState: DrawingBoardData = {
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
    setPenColor: (state, action: PayloadAction<string>) => {
      state.pen.color = action.payload;
    },
    setPenWidth: (state, action: PayloadAction<number>) => {
      state.pen.width = action.payload;
    },
    setEraserWidth: (state, action: PayloadAction<number>) => {
      state.eraser.width = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCurrentTool: (state, action: PayloadAction<string>) => {
      state.currentTool = action.payload;
    },
    setPagePath: (
      state,
      action: PayloadAction<{ currentPage: number; paths: DrawingData[] }>,
    ) => {
      const { currentPage, paths } = action.payload;
      state.page[currentPage].drawingData = paths;
    },
    setPageBase64File: (
      state,
      action: PayloadAction<{ currentPage: number; base64File: string }>,
    ) => {
      const { currentPage, base64File } = action.payload;
      state.page[currentPage].base64File = base64File;
    },
    setPathUndo: (
      state,
      action: PayloadAction<{
        currentPage: number;
        restPaths: DrawingData[];
        lastPath: DrawingData[];
      }>,
    ) => {
      const { currentPage, restPaths, lastPath } = action.payload;
      state.page[currentPage].drawingData = restPaths;
      state.page[currentPage].redoData = [
        ...state.page[currentPage].redoData,
        lastPath,
      ];
    },
    setPathRedo: (
      state,
      action: PayloadAction<{
        currentPage: number;
        restPaths: DrawingData[];
        lastPath: DrawingData[];
      }>,
    ) => {
      const { currentPage, restPaths, lastPath } = action.payload;
      state.page[currentPage].drawingData = [
        ...state.page[currentPage].drawingData,
        lastPath,
      ];
      state.page[currentPage].redoData = restPaths;
    },
    createNewCanvas: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      state.currentPage = 1;
      state.currentTool = "pen";
      state.pen.width = 3;
      state.pen.color = "#000000";
      state.eraser.width = 5;
      state.page = {
        1: {
          base64File: "",
          drawingData: [],
          redoData: [],
        },
        2: {
          base64File: "",
          drawingData: [],
          redoData: [],
        },
        3: {
          base64File: "",
          drawingData: [],
          redoData: [],
        },
        4: {
          base64File: "",
          drawingData: [],
          redoData: [],
        },
      };
    },
    setTitleList: (state, action: PayloadAction<string[]>) => {
      state.titleList = action.payload;
    },
    pushTitleList: (state, action: PayloadAction<string>) => {
      state.titleList = [...state.titleList, action.payload];
    },
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

export const selectPenColor = (state: RootState) =>
  state.drawingBoard.pen.color;
export const selectPenWidth = (state: RootState) =>
  state.drawingBoard.pen.width;
export const selectEraserColor = (state: RootState) =>
  state.drawingBoard.eraser.color;
export const selectEraserWidth = (state: RootState) =>
  state.drawingBoard.eraser.width;
export const selectTitle = (state: RootState) => state.drawingBoard.title;
export const selectCurrentPage = (state: RootState) =>
  state.drawingBoard.currentPage;
export const selectCurrentTool = (state: RootState) =>
  state.drawingBoard.currentTool;
export const selectImagePage = (state: RootState) => state.drawingBoard.page;
export const selectTitleList = (state: RootState) =>
  state.drawingBoard.titleList;

export default drawingBoardSlice.reducer;

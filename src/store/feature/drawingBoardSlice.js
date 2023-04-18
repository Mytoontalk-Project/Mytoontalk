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
    setPagePath: (state, action) => {
      const { currentPage, paths } = action.payload;
      state.page[currentPage].drawingData = paths;
    },
    setPathUndo: (state, action) => {
      const { currentPage, restPaths, lastPath } = action.payload;
      state.page[currentPage].drawingData = restPaths;
      state.page[currentPage].redo = [
        ...state.page[currentPage].drawingData,
        lastPath,
      ];
    },
    createNewCanvas: (state, action) => {
      state.title = action.payload;
      state.currentPage = 1;
      state.currentTool = null;
      state.page = {
        1: {
          drawingData: [],
          audioData: [],
          redo: [],
        },
        2: {
          drawingData: [],
          audioData: [],
          redo: [],
        },
        3: {
          drawingData: [],
          audioData: [],
          redo: [],
        },
        4: {
          drawingData: [],
          audioData: [],
          redo: [],
        },
      };
    },
  },
});

export const {
  createNewCanvas,
  setCurrentPage,
  setTitle,
  setPenColor,
  setPenWidth,
  setEraserWidth,
  setCurrentTool,
  setPagePath,
  setPathUndo,
} = drawingBoardSlice.actions;

export const selectPenColor = (state) => state.drawingBoard.pen.color;
export const selectPenWidth = (state) => state.drawingBoard.pen.width;
export const selectEraserColor = (state) => state.drawingBoard.eraser.color;
export const selectEraserWidth = (state) => state.drawingBoard.eraser.width;
export const selectTitle = (state) => state.drawingBoard.title;
export const selectCurrentPage = (state) => state.drawingBoard.currentPage;
export const selectCurrentTool = (state) => state.drawingBoard.currentTool;
export const selectPage = (state) => state.drawingBoard.page;
export const movePathUndo = () => (dispatch, getState) => {
  const currentPage = selectCurrentPage(getState());
  const pagePaths = selectPage(getState())[currentPage].drawingData;

  if (pagePaths.length) {
    const lastPath = pagePaths[pagePaths.length - 1];
    const restPaths = pagePaths.slice(0, pagePaths.length - 1);

    dispatch(setPathUndo({ currentPage, lastPath, restPaths }));
  }
};
export default drawingBoardSlice.reducer;

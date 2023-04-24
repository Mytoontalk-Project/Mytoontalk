import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: {
    1: {
      audioData: [],
    },
    2: {
      audioData: [],
    },
    3: {
      audioData: [],
    },
    4: {
      audioData: [],
    },
  },
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setPageRecordings: (state, action) => {
      const { currentPage, updatedRecordings } = action.payload;
      state.page[currentPage].audioData = updatedRecordings;
    },
    createNewRecording: (state) => {
      state.page = {
        1: {
          audioData: [],
        },
        2: {
          audioData: [],
        },
        3: {
          audioData: [],
        },
        4: {
          audioData: [],
        },
      };
    },
  },
});

export const { setPageRecordings, createNewRecording } = audioSlice.actions;

export const selectAudioPage = (state) => state.audio.page;

export default audioSlice.reducer;

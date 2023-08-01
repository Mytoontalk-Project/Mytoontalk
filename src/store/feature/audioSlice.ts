import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../configureStore";

import { AudioDataInterface, AudioData } from "../../types/audioType";

const initialState: AudioDataInterface = {
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
    setPageRecordings: (
      state,
      action: PayloadAction<{
        currentPage: number;
        updatedRecordings: AudioData[];
      }>,
    ) => {
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

export const selectAudioPage = (state: RootState) => state.audio.page;

export default audioSlice.reducer;

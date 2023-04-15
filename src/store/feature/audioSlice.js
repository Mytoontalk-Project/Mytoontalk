import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recording: null,
  recordings: [],
  message: null,
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setRecording: (state, action) => {
      state.recording = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setRecordings: (state, action) => {
      state.recordings = action.payload;
    },
  },
});

export const { setRecording, setMessage, setRecordings } = audioSlice.actions;

export const selectRecording = (state) => state.audio.recording;
export const selectRecordings = (state) => state.audio.recordings;
export const selectMessage = (state) => state.audio.message;

export default audioSlice.reducer;

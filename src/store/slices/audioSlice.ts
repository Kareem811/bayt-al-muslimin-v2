import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AudioState {
  src: string | null;
  title: string;
  subtitle: string;
  isPlaying: boolean;
}

const initialState: AudioState = {
  src: null,
  title: "",
  subtitle: "",
  isPlaying: false,
};

interface PlayPayload {
  src: string;
  title: string;
  subtitle: string;
}

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    play(state, action: PayloadAction<PlayPayload>) {
      state.src = action.payload.src;
      state.title = action.payload.title;
      state.subtitle = action.payload.subtitle;
      state.isPlaying = true;
    },
    pause(state) {
      state.isPlaying = false;
    },
    resume(state) {
      if (state.src) state.isPlaying = true;
    },
    stop(state) {
      state.src = null;
      state.title = "";
      state.subtitle = "";
      state.isPlaying = false;
    },
  },
});

export const { play, pause, resume, stop } = audioSlice.actions;
export default audioSlice.reducer;

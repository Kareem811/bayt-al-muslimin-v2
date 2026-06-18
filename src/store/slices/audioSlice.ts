import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AudioTrack {
  src: string;
  title: string;
  subtitle: string;
}

export interface AudioState {
  src: string | null;
  title: string;
  subtitle: string;
  isPlaying: boolean;
  /** The collection currently loaded into the player. */
  queue: AudioTrack[];
  /** Index of the playing track within `queue`, or -1 when idle. */
  index: number;
  /** Identity of the collection that owns `queue` (e.g. "reciter:5:0", "radio"). */
  context: string | null;
}

const initialState: AudioState = {
  src: null,
  title: "",
  subtitle: "",
  isPlaying: false,
  queue: [],
  index: -1,
  context: null,
};

interface PlayQueuePayload {
  queue: AudioTrack[];
  index: number;
  context: string;
}

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    /** Load a collection and start playing one of its tracks. */
    playQueue(state, action: PayloadAction<PlayQueuePayload>) {
      const { queue, index, context } = action.payload;
      const track = queue[index];
      if (!track) return;
      state.queue = queue;
      state.index = index;
      state.context = context;
      state.src = track.src;
      state.title = track.title;
      state.subtitle = track.subtitle;
      state.isPlaying = true;
    },
    /** Jump to another track inside the already-loaded queue. */
    playIndex(state, action: PayloadAction<number>) {
      const track = state.queue[action.payload];
      if (!track) return;
      state.index = action.payload;
      state.src = track.src;
      state.title = track.title;
      state.subtitle = track.subtitle;
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
      state.queue = [];
      state.index = -1;
      state.context = null;
    },
  },
});

export const { playQueue, playIndex, pause, resume, stop } = audioSlice.actions;
export default audioSlice.reducer;

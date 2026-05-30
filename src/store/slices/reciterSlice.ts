import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Reciter, PlaylistItem } from "@/types/reciter";

export interface ReciterState {
  current: Reciter | null;
  moshafIndex: number;
  playlist: PlaylistItem[];
  currentIndex: number;
}

const initialState: ReciterState = {
  current: null,
  moshafIndex: 0,
  playlist: [],
  currentIndex: -1,
};

interface SetReciterPayload {
  reciter: Reciter;
  playlist: PlaylistItem[];
}

const reciterSlice = createSlice({
  name: "reciter",
  initialState,
  reducers: {
    setReciter(state, action: PayloadAction<SetReciterPayload>) {
      state.current = action.payload.reciter;
      state.moshafIndex = 0;
      state.playlist = action.payload.playlist;
      state.currentIndex = -1;
    },
    setMoshafIndex(
      state,
      action: PayloadAction<{ index: number; playlist: PlaylistItem[] }>,
    ) {
      state.moshafIndex = action.payload.index;
      state.playlist = action.payload.playlist;
      state.currentIndex = -1;
    },
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },
    clearReciter(state) {
      state.current = null;
      state.moshafIndex = 0;
      state.playlist = [];
      state.currentIndex = -1;
    },
  },
});

export const { setReciter, setMoshafIndex, setCurrentIndex, clearReciter } =
  reciterSlice.actions;
export default reciterSlice.reducer;

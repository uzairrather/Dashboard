import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TimeLog {
  id: number;
  taskName: string;
  startTime: string;
  endTime: string;
  duration: number; // in seconds
}

interface TimeTrackingState {
  logs: TimeLog[];
}

const initialState: TimeTrackingState = {
  logs: [],
};

let logId = 1;

const timeTrackingSlice = createSlice({
  name: 'timeTracking',
  initialState,
  reducers: {
    logTime: (state, action: PayloadAction<Omit<TimeLog, 'id'>>) => {
      state.logs.push({
        id: logId++,
        ...action.payload,
      });
    },
  },
});

export const { logTime } = timeTrackingSlice.actions;
export default timeTrackingSlice.reducer;

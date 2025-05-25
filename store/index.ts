import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import timeTrackingReducer from './timeTrackingSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    timeTracking: timeTrackingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

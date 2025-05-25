import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as taskService from './taskService';

interface TaskState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  items: [],
  loading: false,
  error: null,
};

// 🔹 Fetch tasks
const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  return await taskService.getTasks();
});

// 🔹 Add task
const addTask = createAsyncThunk(
  'tasks/add',
  async (taskData: { title: string; description: string }) => {
    return await taskService.createTask(taskData);
  }
);

// 🔹 Delete task
const deleteTask = createAsyncThunk('tasks/delete', async (id: string) => {
  await taskService.deleteTask(id);
  return id;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch tasks';
      })

      // Add task
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to add task';
      })

      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to delete task';
      });
  },
});

// ✅ Export thunks + reducer
export { fetchTasks, addTask, deleteTask };
export default taskSlice.reducer;

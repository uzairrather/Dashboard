import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type Task = {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
};

interface TaskState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  items: [],
  loading: false,
  error: null,
};

const API_URL = 'http://localhost:4000/api/tasks';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (title: string) => {
  const res = await axios.post(API_URL, { title });
  return res.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;

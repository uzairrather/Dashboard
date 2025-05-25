import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  user: { email: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const API = 'http://localhost:5000/api/auth';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/login`, { email, password });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/register`, { email, password });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Register failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setAuthFromStorage: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
        state.user = { email: 'user@example.com' };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = { email: action.payload.email };
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.token = action.payload.token;
        state.user = { email: action.payload.email };
        localStorage.setItem('token', action.payload.token);
      });
  },
});

export const { logout, setAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;

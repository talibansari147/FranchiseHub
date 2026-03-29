import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = 'http://localhost:5000/branches';

export const fetchBranches = createAsyncThunk("branches/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addBranch = createAsyncThunk("branches/add", async (branch) => {
  const res = await axios.post(API_URL, branch);
  return res.data;
});

export const editBranch = createAsyncThunk("branches/edit", async ({ id, updated }) => {
  const res = await axios.patch(`${API_URL}/${id}`, updated);
  return res.data;
});

export const deleteBranch = createAsyncThunk("branches/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const branchSlice = createSlice({
  name: "branches",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBranch.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editBranch.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = Object.assign({}, state.items[index], action.payload);
        }
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
});

export default branchSlice.reducer;

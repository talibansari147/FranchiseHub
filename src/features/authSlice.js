import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Fetch role from db.json
    const res = await axios.get(`${API_URL}/users?email=${email}`);
    let role = 'user'; // default role
    let branchId = null;

    if (res.data.length > 0) {
      role = res.data[0].role;
      branchId = res.data[0].branchId || null;
    }

    return {
      uid: user.uid,
      email: user.email,
      role: role,
      branchId: branchId
    };
  } catch (error) {
    console.error("Login Error:", error);
    if (error.code === 'auth/invalid-credential') return rejectWithValue("Invalid email or password.");
    return rejectWithValue(error.message);
  }
});

export const signupUser = createAsyncThunk('auth/signup', async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Add default user role to db.json
    await axios.post(`${API_URL}/users`, {
      id: user.uid,
      email: user.email,
      role: 'user'
    });

    return {
      uid: user.uid,
      email: user.email,
      role: 'user',
      branchId: null
    };
  } catch (error) {
    console.error("Signup Error:", error);
    if (error.code === 'auth/email-already-in-use') return rejectWithValue("Email already in use.");
    if (error.code === 'auth/weak-password') return rejectWithValue("Password should be at least 6 characters.");
    if (error.code === 'auth/operation-not-allowed') return rejectWithValue("Email/Password Auth is disabled in Firebase Console!");
    return rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
  return null;
});

export const checkAuth = () => (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const res = await axios.get(`${API_URL}/users?email=${user.email}`);
        let role = 'user';
        let branchId = null;
        if (res.data.length > 0) {
          role = res.data[0].role;
          branchId = res.data[0].branchId || null;
        }
        dispatch(setUser({ uid: user.uid, email: user.email, role, branchId }));
      } catch (err) {
        console.error("Failed to fetch user role:", err);
        dispatch(setUser({ uid: user.uid, email: user.email, role: 'user', branchId: null }));
      }
    } else {
      dispatch(setUser(null));
    }
    dispatch(setLoading(false));
  });
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // { uid, email, role, branchId }
    loading: true,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;

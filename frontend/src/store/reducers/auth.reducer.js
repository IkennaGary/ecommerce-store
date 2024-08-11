import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthenticationService";
import toast from "react-hot-toast";

const initialState = {
  user: [],
  isAuthenticated: false,
  isLoading: false,
  errorMessage: null,
};

export const loginUser = createAsyncThunk(
  "/signin",
  async (formData, thunkAPI) => {
    try {
      const res = await AuthService.login(formData);
      localStorage.setItem("token", res.data.data.token);
      return res.data.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state, action) => {
      state.user = {};
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    ///////// LOGIN USER /////////////////////
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  },
});
export const { setUser, clearUser } = loginSlice.actions;
export default loginSlice.reducer;

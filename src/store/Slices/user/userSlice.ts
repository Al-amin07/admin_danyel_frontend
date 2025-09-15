// src/redux/slices/userSlice.ts
// import { RootState } from "@/redux/store";
import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

export interface UserData {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  profileImage: string;
  isDeleted: boolean;
  isBlocked: boolean;
  isProfileUpdate: boolean;
  emailVerificationCode: string;
  emailVerificationExpires: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoggedin: string;
}

interface UserState {
  accessToken: string | null;
  user: UserData | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const accessToken = (state: RootState) => state.user.accessToken;
export const { setUser, updateUser, logout } = userSlice.actions;

export default userSlice.reducer;

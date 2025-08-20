// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface User {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
// }

// interface UserState {
//   users: User[];
// }

// const initialState: UserState = {
//   users: [],
// };

// const userSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {
//     setUsers: (state, action: PayloadAction<User[]>) => {
//       state.users = action.payload;
//     },
//     addUser: (state, action: PayloadAction<User>) => {
//       state.users.push(action.payload);
//     },
//   },
// });

// export const { setUsers, addUser } = userSlice.actions;
// export default userSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: any | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<any>) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, logout } = userSlice.actions;
export default userSlice.reducer;

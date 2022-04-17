import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    name: '',
    username: '',
    token: '',
    email: '',
    authenticated: false
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload
    }
  }
});

export const { setUser, setAuthenticated } = userSlice.actions;

export default userSlice.reducer;

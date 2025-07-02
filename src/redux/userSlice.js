import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: null,
  isLoading: false,
  joinedLobby: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userData = action.payload
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setLobby(state, action) {
      state.joinedLobby = action.payload
    },
  },
})

export const { setUser, setIsLoading, setLobby } = userSlice.actions
export default userSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sessionUserData: null,
  userProfileData: null,
  isLoading: true,
  joinedLobby: null,
  teamCode: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSessionUser(state, action) {
      state.sessionUserData = action.payload
    },
    setProfileUser(state, action) {
      state.userProfileData = action.payload
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setLobby(state, action) {
      state.joinedLobby = action.payload
    },
    setTeamCode(state, action) {
      state.teamCode = action.payload
    },
  },
})

export const {
  setSessionUser,
  setProfileUser,
  setIsLoading,
  setLobby,
  setTeamCode,
} = userSlice.actions
export default userSlice.reducer

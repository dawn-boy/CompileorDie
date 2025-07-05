import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sessionUserData: null,
  userProfileData: null,
  isLoading: true,
  joinedLobby: null,
  teamCode: null,
  role: null,
  showWelcomeScreen: true,
  round: 1,
  chosenOne: null,
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
    setRole(state, action) {
      state.role = action.payload
    },
    setShowWelcomeScreen(state, action) {
      state.showWelcomeScreen = action.payload
    },
    incrementRound(state) {
      state.round += 1
    },
    setRound(state, action) {
      state.round = action.payload
    },
    setChosenOne(state, action) {
      state.chosenOne = action.payload
    },
  },
})

export const {
  setSessionUser,
  setProfileUser,
  setIsLoading,
  setLobby,
  setTeamCode,
  setRole,
  setShowWelcomeScreen,
  incrementRound,
  setRound,
  setChosenOne,
} = userSlice.actions
export default userSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sessionUserData: null,
  userProfileData: null,
  isLoading: true,
  joinedLobby: null,
  team: [],
  teamInfo: {},
  teamCode: null,
  role: null,
  showWelcomeScreen: true,
  round: 1,
  cycle: 1,
  chosenOne: { choice: null },
  playerId: null,
  questionNumber: 0,
  questions: [],
  question: null,
  answer: null,
  isEliminated: false,
  eliminationList: {},
  eliminatedPlayers: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserStates: () => initialState,
    incrementQuestionNumber(state) {
      state.questionNumber += 1
    },
    setQuestionNumber(state, action) {
      state.questionNumber = action.payload
    },
    setQuestion(state, action) {
      state.question = action.payload
    },
    setAnswer(state, action) {
      state.answer = action.payload
    },
    setQuestions(state, action) {
      state.questions = action.payload
    },
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
    incrementCycle(state) {
      state.cycle += 1
    },
    setRound(state, action) {
      state.round = action.payload
    },
    setCycle(state, action) {
      state.cycle = action.payload
    },
    setChosenOne(state, action) {
      state.chosenOne = action.payload
    },
    setPlayerId(state, action) {
      state.playerId = action.payload
    },
    setTeam(state, action) {
      state.team = action.payload
    },
    setTeamInfo(state, action) {
      state.teamInfo = action.payload
    },
    setIsEliminated(state, action) {
      state.isEliminated = action.payload
    },
    updateEliminationList(state, action) {
      state.eliminationList = { ...state.eliminationList, ...action.payload }
    },
    clearEliminationList(state) {
      state.eliminationList = {}
    },
    clearEliminatedPlayers(state) {
      state.eliminatedPlayers = []
    },
    updateEliminatedPlayers(state, action) {
      action.payload.forEach(player => {
        if (!state.eliminatedPlayers.includes(player.toLowerCase())) {
          state.eliminatedPlayers.push(player.toLowerCase())
        }
      })
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
  setPlayerId,
  setTeam,
  incrementCycle,
  resetUserStates,
  setTeamInfo,
  setCycle,
  incrementQuestionNumber,
  setQuestionNumber,
  setQuestion,
  setAnswer,
  setQuestions,
  setIsEliminated,
  updateEliminationList,
  clearEliminationList,
  clearEliminatedPlayers,
  updateEliminatedPlayers,
} = userSlice.actions
export default userSlice.reducer

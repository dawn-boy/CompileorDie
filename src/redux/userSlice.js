import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: null,
  isLoading: false,
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
  },
})

export const { setUser, setIsLoading } = userSlice.actions
export default userSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from '../services/apiRequests.js'

export const fetchData = createAsyncThunk('api/fetchdata', async () => {
  const data = await getData()
  return data
})

const initialState = {
  payload: '',
  status: 'idle', // idle, loading, succeeded, failed
  action: '',
  error: '',
}

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.payload = action.payload.payload
        state.action = action.payload.action
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = 'Failed to fetch the API data'
      })
  },
})

export default apiSlice.reducer

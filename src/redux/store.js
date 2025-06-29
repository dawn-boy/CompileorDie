import { configureStore } from '@reduxjs/toolkit'
import apiReducer from './apiSlice.js'

const store = configureStore({
  reducer: {
    api: apiReducer,
  },
})

export default store

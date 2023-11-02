import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  latestDesigns: [],
  isError: '',
  isLoading: true
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setLatestDesigns: (state, action) => {
      state.latestDesigns = action.payload
    },
    setIsError: (state, action) => {
      state.isError = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLatestDesigns,setIsError,setIsLoading } = homeSlice.actions

export default homeSlice.reducer
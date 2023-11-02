import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clientId: '',
  userDetails: null,
  profile: null,
  accessToken: null,
  loggedWith: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setClientId: (state, action) => {
      state.clientId = action.payload
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload
    },
    setProfile: (state, action) =>{
      state.profile = action.payload
    },
    setAccessToken: (state, action) =>{
      state.accessToken = action.payload
    },
    setLoggedWith: (state, action) =>{
      state.loggedWith = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setClientId, setUserDetails, setProfile, setAccessToken, setLoggedWith } = authSlice.actions

export default authSlice.reducer
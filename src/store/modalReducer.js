import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showSignIn: false,
  showSignOut: false,
  showGetCallDialog: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setShowSignIn: (state, action) => {
      state.showSignIn = action.payload
    },
    setShowSignOut: (state, action) => {
      state.showSignOut = action.payload
    },
    setShowGetCallDialog: (state, action) => {
      state.showGetCallDialog = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setShowSignIn } = modalSlice.actions
export const { setShowSignOut } = modalSlice.actions
export const { setShowGetCallDialog } = modalSlice.actions


export default modalSlice.reducer
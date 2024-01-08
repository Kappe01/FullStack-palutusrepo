import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    message: '',
    show: false,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        showNotification(state, action) {
            state.message = action.payload
            state.show = true
        },
        hideNotification(state) {
            state.show = false
            state.message = ''
        }
    }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const displayNotification = (message) => (dispatch) => {
  dispatch(showNotification(message))
  setTimeout(() => {
    dispatch(hideNotification())
  }, 5000)
}

export default notificationSlice.reducer
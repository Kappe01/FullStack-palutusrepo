import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import storageService from '../services/storage'
import { displayNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = loginSlice.actions

export const initializeUser = () => {
  return (dispatch) => {
    const user = storageService.loadUser()
    if (user) {
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      storageService.saveUser(user)
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(displayNotification('welcome!'))
    } catch (e) {
      dispatch(displayNotification('wrong username or password', 'error'))
    }
  }
}

export const logoutUser = (user) => {
  return (dispatch) => {
    setUser(null)
    storageService.removeUser()
    blogService.removeToken(user.token)
    dispatch(displayNotification('logged out'))
  }
}

export default loginSlice.reducer

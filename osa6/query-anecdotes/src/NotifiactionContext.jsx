import { createContext, useReducer, useContext } from "react"

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'show': {
      return { ...state, message: action.payload, show: true }}
    case 'hide':
      return { ...state, show: false, message: '' }
    default:
      return state
  }
}

export const NotificationProvider = (props) => {
  const initialState = {
    message: '',
    show: false,
  }

  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
  }
  
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext

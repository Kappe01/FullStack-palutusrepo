import { useNotificationValue } from "../NotifiactionContext"

const Notification = () => {
  const notification = useNotificationValue() 
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notification.show ? 'block' : 'none',
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification

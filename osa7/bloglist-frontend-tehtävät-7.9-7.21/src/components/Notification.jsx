import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((store) => store.notification)

  if (notification.message === null) {
    return null
  }

  const className =
    notification.type === 'success'
      ? 'notification-msg'
      : 'notification-msg-error'

  return <div className={className}>{notification.message}</div>
}

export default Notification

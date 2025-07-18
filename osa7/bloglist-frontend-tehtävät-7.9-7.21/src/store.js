import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './features/notification/notificationSlice'
import blogsReducer from './features/blog/blogsSlice'
import userReducer from './features/user/userSlice'
import usersReducer from './features/users/usersSlice'

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
  },
})

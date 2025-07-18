import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//COMPONENTS
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Navigation from './components/Navigation'
import BlogList from './components/BlogList'
import BlogDetails from './components/BlogDetails'

//SERVICES
import blogService from './services/blogs'
import loginService from './services/login'

/* REDUX TOOLKIT */
import { useDispatch, useSelector } from 'react-redux'
//Notification slice import
import {
  setNotification,
  clearNotification,
} from './features/notification/notificationSlice'
//Blogs slice import
import {
  setBlogs,
  addBlog,
  updateBlog,
  removeBlog,
} from './features/blog/blogsSlice'
//User slice import
import { setUser, logoutUser } from './features/user/userSlice'
import Title from './components/Title'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((store) => store.notification)
  const user = useSelector((store) => store.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //SHOW NOTIFICATION with Redux
  const showNotification = (message, type) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  //FETCH BLOGS WITH REDUX
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        // sort by likes value
        blogs.sort((a, b) => b.likes - a.likes)

        dispatch(setBlogs(blogs))
      } catch (error) {
        console.error(error)
      }
    }
    fetchBlogs()
  }, [dispatch])

  //LOAD USER FROM LOCALSTORAGE ***VIA REDUX***
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  //LOGIN USER VIA REDUX
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(setUser(user))

      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error)
      showNotification('Wrong username or password', 'error')
    }
  }

  //LOGOUT USER VIA REDUX
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(logoutUser())
  }

  //USER NOT LOGGED IN
  if (!user) {
    return (
      <div>
        <Notification message={notification.message} type={notification.type} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  // USER LOGGED IN
  return (
    <Router>
      <Navigation user={user} handleLogout={handleLogout} />
      <Title />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
      </Routes>
    </Router>
  )
}
export default App

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationType, setNotificationType] = useState(null)


  const blogFormRef = useRef()

  //FETCH BLOGS
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        // sort by likes value
        blogs.sort((a, b) => b.likes - a.likes);

        console.log('Blogs list:', blogs.map(b => b.id));
        setBlogs(blogs)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBlogs()
  }, [])

  //LOAD USER FROM LOCALSTORAGE
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //LOGIN
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (error) {
      console.error(error)
      setNotificationMsg('Wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)
    }
  }

  //LOGOUT
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  //ADD NEW BLOG
  const addNewBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(newBlog)
      setBlogs([...blogs, { ...createdBlog, user }])

      setNotificationMsg(`A new blog "${newBlog.title}" by ${newBlog.author} is added`)
      setNotificationType('success')
      setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)
    } catch (error) {
      console.error(error)
      setNotificationMsg('Something went wrong when adding the blog')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)
    }
  }

  //HANDLE LIKES CHANGES
  const handleLike = async (id, updatedBlog) => {
    try {
      console.log('handleLike called with id:', id);
      console.log('Updated blog data:', updatedBlog);

      const returnedBlog = await blogService.update(id, updatedBlog);
      console.log('Returned blog from server:', returnedBlog);

      const updatedBlogAndUser = {
        ...returnedBlog,
        user: updatedBlog.user
      }

      setBlogs(blogs.map(blog => (blog.id !== id ? blog : updatedBlogAndUser)));
    } catch (error) {
      console.error(error);
    }
  }

  //DELETE BLOG
  const handleDelete = async (id) => {
    try {

      await blogService.remove(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  //USER NOT LOGGED IN
  if (!user) {
    return (
      <div>
        <Notification message={notificationMsg} type={notificationType} />
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
    <div>
      <h2>Blogs</h2>
      <Notification message={notificationMsg} type={notificationType} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addNewBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user} />
      ))}
    </div>
  )


}
export default App
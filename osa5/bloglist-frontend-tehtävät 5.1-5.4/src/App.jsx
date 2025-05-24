import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  //FETCH BLOGS
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
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
  const addNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title,
        author,
        url
      }
      const createdBlog = await blogService.create(newBlog)
      setBlogs([...blogs, createdBlog])

      setTitle('')
      setAuthor('')
      setUrl('')
      setNotificationMsg(`A new blog ${newBlog.title} by ${newBlog.author} is added`)
      setNotificationType('success');
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMsg} type={notificationType} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notificationMsg} type={notificationType} />
      <p>
        {user.name} logged in
        <button
          type="button"
          onClick={() => handleLogout()}>
          logout
        </button>
      </p>

      <h2>Create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>


      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
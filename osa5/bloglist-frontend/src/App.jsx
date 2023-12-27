import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessmessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNewBlog = async (event) => {
    event.preventDefault()

    try {
    await blogService.create({
      "title": title, 
      "author": author,
      "url":url
    })
    setTitle('')
    setAuthor('')
    setUrl('')

    blogService.getAll().then(blogs => 
      setBlogs( blogs ))

    setSuccessmessage(`a new blog ${title} by ${author}`)
    setTimeout(() => {
      setSuccessmessage(null)
    }, 5000)

    } catch (exception) {
      setErrorMessage('Failed to create blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.removeToken(null)
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
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
  )}

  const blogForm = () => {
    return (
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    )
  }

  return (
    <div>
      <Notification message={successMessage} />
      <ErrorMessage message={errorMessage} />
      {!user && <div> 
        <h2>log in to application</h2>
        {loginForm()}
      </div>}
      {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in
        <button onClick={handleLogout}>Logout</button></p>
        {blogForm()}
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />
        )}
        </div>}
      
    </div>
  )
}

export default App
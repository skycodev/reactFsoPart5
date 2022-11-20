import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccesMessage] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username
      , password)
    loginService.login({ username, password }).then((response) => {
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response))
      setUser(response)
      setUsername('')
      setPassword('')
      console.log(response)
    }).catch((error) => {
      console.log(error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    blogService.create(blogObject).then((response) => {
      setBlogs(blogs.concat(response))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setSuccesMessage(`a new blog ${response.title} by ${response.author} added`)
      setTimeout(() => {
        setSuccesMessage(null)
      }
      , 5000)
    }).catch((error) => {
      console.log(error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      <h2>blogs</h2>
      {user === null
        ? (
          <form onSubmit={handleLogin}>
            <div>
              username &nbsp;
              <input
                type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password &nbsp;
              <input
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type='submit'>login</button>
          </form>
          )
        : (
          <div>
            <div>
              {user.username} logged in
              <span> </span>
              <button onClick={handleLogout}>logout</button>
            </div>
            <h2> create new </h2>
            <form onSubmit={addBlog}>
              <div>
                title &nbsp;
                <input
                  type='text'
                  value={newTitle}
                  name='Title'
                  onChange={({ target }) => setNewTitle(target.value)}
                />
              </div>
              <div>
                author &nbsp;
                <input
                  type='text'
                  value={newAuthor}
                  name='Author'
                  onChange={({ target }) => setNewAuthor(target.value)}
                />
              </div>
              <div>
                url &nbsp;
                <input
                  type='text'
                  value={newUrl}
                  name='Url'
                  onChange={({ target }) => setNewUrl(target.value)}
                />
              </div>
              <button type='submit'>create</button>
            </form>

            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>

          )}

    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import loginService from './services/login'
import blogService from './services/blogs'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
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
    loginService.login({ username, password }).then((response) => {
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response))
      setUser(response)
      setUsername('')
      setPassword('')
    }).catch((error) => {
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

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((response) => {
      const newblogs = [...blogs, response]
      setBlogs(newblogs)
      setSuccessMessage(`a new blog ${response.title} by ${response.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }
      , 5000)
    }).catch((error) => {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }
  const updateBlog = (BlogToUpdate) => {
    blogService.update(BlogToUpdate.id, { likes: BlogToUpdate.likes }).then((response) => {
      setBlogs(blogs.map(blog => blog.id !== response.id ? blog : response))
      setSuccessMessage(`blog ${response.title} by ${response.author} updated`)
      setTimeout(() => {
        setSuccessMessage(null)
      }
      , 5000)
    }).catch((error) => {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const removeBlog = (idBlog) => {
    blogService.remove(idBlog).then((response) => {
      setSuccessMessage(`blog ${response.title} by ${response.author} removed`)
      const updatedBlogs = blogs.filter(blog => blog.id !== idBlog)
      setBlogs(updatedBlogs)
      setTimeout(() => {
        setSuccessMessage(null)
      }
      , 5000)
    }).catch((error) => {
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

          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />

          )
        : (
          <div>
            <div>
              {user.username} logged in
              <span> </span>
              <button onClick={handleLogout}>logout</button>
            </div>
            <BlogForm
              addBlog={addBlog}
            />
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={updateBlog}
                  removeBlog={removeBlog}
                  user={user}
                />
              )}
          </div>

          )}

    </div>
  )
}

export default App

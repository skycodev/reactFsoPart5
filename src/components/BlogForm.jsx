import { useState, useRef } from 'react'
import Toggable from './Toggable'
import Proptypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const toggableRef = useRef()
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const formSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    addBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    toggableRef.current.toggleVisibility()
  }
  console.log('toggableRef', toggableRef)
  return (
    <>
      <Toggable buttonLabel='New blog' ref={toggableRef}>
        <h2> create new blog</h2>
        <form onSubmit={formSubmit}>
          <div>
            title &nbsp;
            <input
              type='text'
              value={newTitle}
              name='Title'
              onChange={(event) => handleTitleChange(event)}
            />
          </div>
          <div>
            author &nbsp;
            <input
              type='text'
              value={newAuthor}
              name='Author'
              onChange={(event) => handleAuthorChange(event)}
            />
          </div>
          <div>
            url &nbsp;
            <input
              type='text'
              value={newUrl}
              name='Url'
              onChange={(event) => handleUrlChange(event)}
            />
          </div>
          <button type='submit'>create</button>
        </form>
      </Toggable>
    </>

  )
}
BlogForm.propTypes = {
  addBlog: Proptypes.func.isRequired
}
export default BlogForm

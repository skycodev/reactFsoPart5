
import Toggable from './Toggable'
import './Blog.css'
const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(newBlog)
  }
  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <Toggable buttonLabel='view'>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} &nbsp;
          <button className='like--btn' onClick={() => handleLike()}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {blog.user.username === user.username && (
          <button className='delete--btn' onClick={handleDelete}>
            delete
          </button>
        )}

      </Toggable>
    </div>
  )
}

export default Blog

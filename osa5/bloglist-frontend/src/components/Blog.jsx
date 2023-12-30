import { useState } from 'react'


const Blog = ({ blog, deleteBlog, addLike, name }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='blogHidden'>
        {blog.title} {blog.author } <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='blogShown'>
        <div>
          {blog.title} {blog.author }<button onClick={toggleVisibility}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={() => addLike(blog)}>like</button>
        </div>
        <div>
          {name}
        </div>
        <button onClick={() => deleteBlog(blog)}>remove</button>
      </div>
    </div>
  )}

export default Blog
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import { Table } from 'react-bootstrap'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid',
  }

  return (
    <div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs

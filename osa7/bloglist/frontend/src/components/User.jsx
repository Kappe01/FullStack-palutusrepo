import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const blogs = useSelector((state) => state.blogs)
  const { id } = useParams()

  const userBlogs = blogs.filter(
    (blog) => blog.user.id.toString() === id.toString(),
  )
  return (
    <div>
      <h2>{userBlogs[0].user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User

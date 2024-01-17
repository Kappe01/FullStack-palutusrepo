import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { displayNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    dispatch(addBlog({ title, author, url }))
    dispatch(displayNotification(`A new blog '${title}' by '${author}' added`))
  }

  return (
    <div>
      <h4>Create a new blog</h4>

      <form onSubmit={handleSubmit}>
        <div>
          title
          <input name="title" />
        </div>
        <div>
          author
          <input name="author" />
        </div>
        <div>
          url
          <input name="url" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm

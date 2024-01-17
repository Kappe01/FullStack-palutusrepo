import {
  addLike,
  sort_blogs,
  removeBlog,
  addComment,
} from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const { id } = useParams()

  const currBlog = blogs.find((blog) => blog.id === id)

  console.log(currBlog)
  const comments = currBlog.comments
    .map((comment, index) => ({
      id: index,
      content: comment,
    }))
    .reverse() // newest comes first

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`,
    )
    if (ok) {
      dispatch(removeBlog(blog.id))
      dispatch(
        displayNotification(
          `The blog' ${blog.title}' by '${blog.author} removed`,
        ),
      )
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value

    dispatch(addComment(id, comment))
  }

  const like = async (blog) => {
    dispatch(addLike(blog))
    dispatch(
      displayNotification(
        `A like for the blog '${blog.title}' by '${blog.author}'`,
      ),
    )
    dispatch(sort_blogs())
  }
  return (
    <div>
      <h2>
        {currBlog.title} {currBlog.author}
      </h2>
      <div>
        <a href={currBlog.url}>{currBlog.url}</a>
      </div>
      <div>
        {currBlog.likes} likes{' '}
        <button onClick={() => like(currBlog)}>like</button>
      </div>
      <div>
        added by {currBlog.user.name}{' '}
        <button onClick={() => remove(currBlog)}>remove</button>
      </div>
      <h4>comments</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="comment" />
          <button type="submit">add comment</button>
        </div>
      </form>
      <ul>
        {comments.map((comment) => (
          <div key={comment.id}>
            <li>{comment.content}</li>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Blog

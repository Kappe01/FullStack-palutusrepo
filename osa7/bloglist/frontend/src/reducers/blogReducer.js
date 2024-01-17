import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push({ ...action.payload, visible: false })
    },
    setBlogs(state, action) {
      return action.payload.map((blog) => ({ ...blog, visible: false }))
    },
    updateBlog(state, action) {
      const { id, updatedBlog } = action.payload
      return state.map((blog) =>
        blog.id === id ? { ...blog, ...updatedBlog } : blog,
      )
    },
    removeBlog(state, action) {
      const idToRemove = action.payload
      return state.filter((blog) => blog.id !== idToRemove)
    },
    sort_blogs(state, action) {
      return state.slice().sort((a, b) => b.likes - a.likes)
    },
    updateBlogComments(state, action) {
      const { id, updatedComment } = action.payload
      return state.map((blog) =>
        blog.id === id
          ? { ...blog, comments: [...blog.comments, updatedComment] }
          : blog,
      )
    },
  },
})

export const {
  appendBlog,
  setBlogs,
  updateBlog,
  sort_blogs,
  updateBlogComments,
} = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (object) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(object)
    dispatch(appendBlog(newBlog))
  }
}

export const addLike = (object) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(object.id, {
      ...object,
      likes: object.likes + 1,
      user: object.user.id,
    })
    dispatch(updateBlog({ id: object.id, updatedBlog: updatedBlog }))
  }
}

export const addComment = (id, content) => {
  return async (dispatch) => {
    const comment = await blogService.comment(id, content)
    dispatch(updateBlogComments({ id, updatedComment: content }))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer

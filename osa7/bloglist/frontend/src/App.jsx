import { useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'

import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

import { initializeUser } from './reducers/loginReducer'

import Users from './components/Users'
import User from './components/User'

import Menu from './components/Menu'

import LoginForm from './components/Login'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="container">
      <Menu />
      <h2>blogs</h2>
      <Notification />

      <Routes>
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/" element={<Blogs />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App

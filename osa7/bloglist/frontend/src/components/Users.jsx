import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'
import { Table } from 'react-bootstrap'

const Users = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState(new Set())

  useEffect(() => {
    const fetchData = async () => {
      const blogsData = await blogService.getAll()
      setBlogs(blogsData)

      const UserIds = new Set(blogsData.map((blog) => blog.user.id.toString()))
      setUsers(UserIds)
    }

    fetchData()
  }, [])

  const countBlogsForUser = (userId) => {
    return blogs.filter((blog) => blog.user.id.toString() === userId.toString())
      .length
  }

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <td></td>
          <td>
            <b>amount of blogs</b>
          </td>
          {Array.from(users).map((user) => (
            <tr key={user}>
              <td>
                <Link to={`/users/${user}`}>
                  {
                    blogs.find((blog) => blog.user.id.toString() === user).user
                      .name
                  }
                </Link>
              </td>
              <td>{countBlogsForUser(user)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users

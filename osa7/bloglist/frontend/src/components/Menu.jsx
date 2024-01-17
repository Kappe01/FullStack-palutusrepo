import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { Navbar, Nav } from 'react-bootstrap'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const padding = {
    paddingRight: 5,
  }
  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              Users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <em>
              {user.name} logged in <button onClick={logout}>logout</button>
            </em>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu

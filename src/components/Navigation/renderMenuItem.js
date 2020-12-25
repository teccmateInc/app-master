import { string } from 'prop-types'
import React, { useContext } from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthContext from '../../providers/auth/AuthContext'

const renderMenuItem = ({ name, key, path }) => {
  const { authenticatedUser } = useContext(AuthContext)

  // Not show Reports or Profile menu if an Assistant
  if (
    authenticatedUser.userType === 'A' &&
    ['REPORTS', 'PROFILE'].includes(name)
  ) {
    return null
  } else {
    return (
      <Nav.Item key={key}>
        <Nav.Link as={Link} to={path ? path : key} className="py-0 pr-3">
          {name}
        </Nav.Link>
      </Nav.Item>
    )
  }
}

renderMenuItem.propTypes = {
  name: string.isRequired,
  key: string.isRequired,
  path: string,
}

renderMenuItem.defaultProps = {
  path: '',
}

export default renderMenuItem

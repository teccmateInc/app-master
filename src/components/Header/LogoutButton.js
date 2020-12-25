import { AuthContext } from 'components'
import React, { useContext } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const LogoutButton = () => {
  const { logout } = useContext(AuthContext)

  return (
    <LinkContainer to="/">
      <i
        onClick={logout}
        className="header-nav-button fa fa-power-off fa-2x"
        title="Logout"
      >
        <span style={{ fontFamily: 'Roboto' }}>LOGOUT</span>
      </i>
    </LinkContainer>
  )
}

export default LogoutButton

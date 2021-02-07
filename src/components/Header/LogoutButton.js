import { AuthContext } from 'components'
import React, { useContext } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const LogoutButton = () => {
  const { logout } = useContext(AuthContext)

  return (
    <LinkContainer to='/' style={{ color: '#f2f5f8' }}>
      <i
        onClick={logout}
        className='header-nav-button fa fa-power-off'
        title='Logout'
      >
        <span style={{ fontFamily: 'Roboto', marginLeft: '6px' }}>LOGOUT</span>
      </i>
    </LinkContainer>
  )
}

export default LogoutButton

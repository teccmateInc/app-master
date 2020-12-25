import React, { useContext } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import {
  DATA_NAV,
  HELP_NAV,
  MAIN_NAV,
  REPORTS_NAV,
} from '../../helpers/constants'
import { AuthContext } from '../../providers/auth'
import LogoutButton from '../Header/LogoutButton'
import DataNavigation from './DataNavigation'
import renderMenuItem from './renderMenuItem'

const MainNavigation = () => {
  const { logout } = useContext(AuthContext)

  const { authenticatedUser } = useContext(AuthContext)

  if (authenticatedUser.status !== 'A') {
    return null
  }

  if (
    authenticatedUser.userType === 'A' &&
    ['REPORTS', 'PROFILE'].includes(name)
  ) {
    return null
  }

  const history = useHistory()
  const location = useLocation()

  // console.log('location', JSON.stringify(history))
  // console.log('history.location', history.location)
  // console.log('DATA_NAV', DATA_NAV)
  const isData =
    DATA_NAV.filter(
      (e) =>
        e.key.endsWith(location.pathname) || e.path?.endsWith(location.pathname)
    ).length > 0
  const isReports =
    REPORTS_NAV.filter((e) => e.key === history.location).length > 0
  const isHelp = HELP_NAV.filter((e) => e.key === history.location).length > 0
  // console.log('isData', isData)
  // console.log('isReports', isReports)
  // console.log('isHelp', isHelp)

  let selected = 'contacts'
  if (isData) {
    selected = 'data'
  } else {
    if (isReports) {
      selected = 'analytics'
    } else {
      if (isHelp) {
        selected = 'help_contacts'
      }
    }
  }

  return (
    <Navbar bg="light" expand="sm" style={{ marginBottom: '1em' }}>
      <Navbar.Brand href="/">
        <div className="login-logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="flex-column align-items-start ml-lg-2 ml-0"
      >
        <Nav
          fill={true}
          activeKey={selected}
          variant="tabs"
          className="justify-content-center"
        >
          {MAIN_NAV.map(renderMenuItem)}
        </Nav>
        <DataNavigation />
      </Navbar.Collapse>
      <LogoutButton />
    </Navbar>
  )
}

export default MainNavigation

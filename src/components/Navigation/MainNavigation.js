import React, { useContext, useState } from 'react'
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
// import DataNavigation from './DataNavigation'
// import renderMenuItem from './renderMenuItem'
import SideBar from './SideBar'

const MainNavigation = () => {
  const [isOpen, isSideBarOpen] = useState(false)
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
    <>
      <Navbar
        fixed='top'
        bg='dark'
        expand='sm'
        style={{
          marginBottom: '1em',
          display: 'flex',
          justifyContent: 'space-between',
          // width: '100%',
          zIndex: '1',
        }}
      >
        <div onClick={() => isSideBarOpen(true)}>
          <i
            className='fa fa-bars'
            aria-hidden='true'
            color='white'
            style={{ color: '#f2f5f8', fontSize: '20px' }}
          ></i>
        </div>
        <LogoutButton />
      </Navbar>
      <SideBar open={isOpen} onClickOutSide={(v) => isSideBarOpen(v)} />
    </>
  )
}

export default MainNavigation

import { AuthContext } from 'components'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const Header = () => {
  const { authenticatedUser } = useContext(AuthContext)

  // componentWillReceiveProps(nextProps)
  // {
  //     if (nextProps.authenticated === false && UNAUTHENTICATED_PAGES.indexOf(this.props.history.location.pathname) < 0) {
  //         this.props.history.push('/login')
  //     }
  //     if (nextProps.authenticated === true && nextProps.profile.userType === 'A' && ASSISTANTS_UNAUTHORIZED_PAGES.indexOf(this.props.history.location.pathname) >= 0) {
  //         this.props.history.push('/contacts')
  //     }
  //     if (nextProps.authenticated === true && nextProps.profile.userType !== 'S' && this.props.history.location.pathname === '/all_users') {
  //         this.props.history.push('/contacts')
  //     }
  // }
  //
  // logout()
  // {
  //     this.props.logoutRequest()
  // }

  return (
    <div className="header-container">
      <div className="header">
        <Link className="navbar-brand agency-comp-logo" to={'/contacts'}></Link>
        {authenticatedUser && (
          <div className="header-nav">
            <LogoutButton />
          </div>
        )}
      </div>
      {/*<Elements stripe={stripePromise}>*/}
      {/*    <ElementsConsumer>*/}
      {/*        {({stripe, elements}) => <EditPlanModal stripe={stripe} elements={elements}/>}*/}
      {/*    </ElementsConsumer>*/}
      {/*</Elements>*/}
      {/* TODO - this may need to be reinstated */}
      {/*<UpgradeNeededModal/>*/}
    </div>
  )
}

export default Header

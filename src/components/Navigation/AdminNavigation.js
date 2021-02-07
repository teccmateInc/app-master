import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { ADMIN_NAV } from '../../helpers/constants'


const AdminNavigation = () => {
    const {selected} = this.props
    const renderMenuItem = ({name, key}) => (
        <LinkContainer key={'nav-' + key} to={key}>
            <NavItem className={selected === key ? 'active' : ''}>{name}</NavItem>
        </LinkContainer>
    )

    return (
        <Nav className="main-nav" variant="pills" activeKey={selected}>
            {ADMIN_NAV.map(renderMenuItem)}
        </Nav>
    )
}

export default AdminNavigation

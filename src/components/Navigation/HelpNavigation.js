import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import { HELP_NAV } from '../../helpers/constants'


const HelpNavigation = () => {
    let history = useHistory()

    const selected = HELP_NAV.filter(e => e.key === history.location).length > 0
    console.log(JSON.stringify(HELP_NAV))
    console.log(JSON.stringify(history.location))
    console.log(JSON.stringify(HELP_NAV.filter(e => e.key === history.location).length))

    const renderMenuItem = ({name, key}) => (
        <LinkContainer key={'nav-' + key} to={key}>
            <NavItem className={selected === key ? 'active' : ''}>{name}</NavItem>
        </LinkContainer>
    )

    return (
        <div className="data-nav-container">
            <Nav className="data-nav" variant="pills" activeKey={selected}>
                {HELP_NAV.map(renderMenuItem)}
                <NavItem href={'http://agencycomp.com/wp-content/uploads/Help_Guide.pdf'}
                         target="_blank">
                    User Guide
                </NavItem>
            </Nav>
        </div>
    )
}

export default HelpNavigation

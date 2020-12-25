import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { REPORTS_NAV } from '../../helpers/constants'

const ReportsNavigation = () => {
  const selected = this.props.selected || REPORTS_NAV[0].key,
    renderMenuItem = ({ name, key }) => (
      <LinkContainer key={'nav-' + key} to={key}>
        <NavItem className={selected === key ? 'active' : ''}>{name}</NavItem>
      </LinkContainer>
    ),
    handleSelect = (stuff) => ''

  return (
    <div className="data-nav-container">
      <Nav
        className="data-nav"
        variant="pills"
        activeKey={selected}
        onSelect={handleSelect}
      >
        {REPORTS_NAV.map(renderMenuItem)}
      </Nav>
    </div>
  )
}

export default ReportsNavigation

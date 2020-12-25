import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { DATA_NAV } from '../../helpers/constants'
import renderMenuItem from './renderMenuItem'


const DataNavigation = () => {
    let history = useHistory()

    const selected = history.location.pathname.substr(1) || DATA_NAV[0].key

    return (
        <Navbar bg="white" expand="sm">
            {/*//     <Navbar.Toggle aria-controls="basic-navbar-nav"/>*/}
            {/*//     <Navbar.Collapse id="basic-navbar-nav">*/}
            <Nav
                fill
                // activeKey={selected}
                variant="tabs"
                className="flex-row mb-md-1 mt-md-0 mb-3 mt-2"
            >
                {DATA_NAV.map(renderMenuItem)}
            </Nav>
            {/*//     </Navbar.Collapse>*/}
        </Navbar>
    )
}

export default DataNavigation

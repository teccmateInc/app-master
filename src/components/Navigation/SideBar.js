import React from 'react'
import { useLocation } from 'react-router-dom'
import { Dropdown, ListGroup, Nav } from 'react-bootstrap'
import { SIDE_MENU } from '../../helpers/constants'
import renderMenuItem from './renderMenuItem'
import Logo from '../../static/img/AgencyComp_Logo.png'

export default function SideBar({ open, onClickOutSide }) {
  const { pathname } = useLocation()
  let selected = pathname.split('/')[1]

  let renderSubMenu = (data) => {
    return (
      <Dropdown key={data.name}>
        <Dropdown.Toggle variant='success' id='dropdown-list'>
          {data.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {data.sub_menu.map((data, i) =>
            data.sub_menu ? (
              renderSubMenu(data)
            ) : (
              <Dropdown.Item
                as='li'
                active={selected == data.key}
                key={data.name}
                onClick={closeSideBar}
              >
                {renderMenuItem(data)}
              </Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  let closeSideBar = () => onClickOutSide(false)

  return (
    <>
      {open && (
        <div className='sideBar'>
          <Nav fill={true} activeKey={selected} variant='tabs'>
            <ListGroup as='ul'>
              <ListGroup.Item as='li' className='nav-title'>
                <img src={Logo} width='100%' />
              </ListGroup.Item>
              {SIDE_MENU.map((data, i) =>
                data.sub_menu ? (
                  renderSubMenu(data)
                ) : (
                  <ListGroup.Item
                    as='li'
                    active={selected == data.key}
                    key={data.key}
                    onClick={closeSideBar}
                  >
                    {renderMenuItem({ ...data, selected })}
                  </ListGroup.Item>
                )
              )}
            </ListGroup>
            <div onClick={closeSideBar} className='drawer'></div>
          </Nav>
        </div>
      )}
    </>
  )
}

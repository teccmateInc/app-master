import {
  faCheckCircle,
  faMinusSquare,
  faPencilAlt,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons'
import { bool, func, number, object, string } from 'prop-types'
import React from 'react'
import { Col } from 'react-bootstrap'
import { Search } from 'react-bootstrap-table2-toolkit'
import ExportCSVButton from './ExportCSVButton'
import SidebarButton from './SidebarButton'

const TableSidebar = ({
  text,
  selected,
  openAddModal,
  openEditModal,
  openDeleteModal,
  hideSelectColumn,
  setHideSelectColumn,
  searchProps,
  // csvProps,
  width,
  searchEnabled,
  // exportEnabled,
  multiSelectEnabled,
  duplicateEnabled,
}) => {
  const { SearchBar } = Search

  const enableMultiSelect = () => {
    setHideSelectColumn(!hideSelectColumn)
  }

  return (
    <Col xs={width}>
      {searchEnabled && (
        <div>
          <SearchBar {...searchProps} />
          <hr />
        </div>
      )}
      <SidebarButton
        text={'New'}
        action={() => openAddModal()}
        variant="primary"
        icon={faPlusSquare}
      />
      <SidebarButton
        text={'Edit'}
        action={() => openEditModal()}
        disabled={!selected}
        variant="success"
        icon={faPencilAlt}
      />
      <SidebarButton
        text={'Delete'}
        action={() => openDeleteModal()}
        disabled={!selected || selected.length == 1}
        variant="danger"
        icon={faMinusSquare}
      />
      {duplicateEnabled && (
        <SidebarButton
          text={'Duplicate'}
          action={() => openAddModal()}
          disabled={!selected || selected.length == 1}
          variant="primary"
          icon={faPlusSquare}
        />
      )}
      {multiSelectEnabled && (
        <div>
          <hr />
          <SidebarButton
            text="Multi-Select"
            action={() => enableMultiSelect()}
            variant="info"
            icon={faCheckCircle}
          />
        </div>
      )}
      {/*{exportEnabled &&*/}
      {/*<div>*/}
      {/*    <hr/>*/}
      {/*    <ExportCSVButton props={csvProps}/>*/}
      {/*</div>}*/}
    </Col>
  )
}

TableSidebar.propTypes = {
  text: string.isRequired,
  selected: object,
  openAddModal: func.isRequired,
  openEditModal: func.isRequired,
  openDeleteModal: func.isRequired,
  hideSelectColumn: bool.isRequired,
  setHideSelectColumn: func.isRequired,
  searchProps: object.isRequired,
  // csvProps: object.isRequired,
  width: number.isRequired,
  searchEnabled: bool.isRequired,
  // exportEnabled: bool.isRequired,
  multiSelectEnabled: bool.isRequired,
  duplicateEnabled: bool.isRequired,
}

export default TableSidebar

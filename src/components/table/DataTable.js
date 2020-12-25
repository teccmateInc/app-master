import { array, bool, func, number, object, string } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import TableSidebar from '../table/TableSidebar'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'
import './table.scss'

const DataTable = ({
  dataName,
  data,
  columns,
  selected,
  setSelected,
  loadData,
  loadSingle,
  openAddModal,
  openEditModal,
  openDeleteModal,
  tableWidth,
  sidebarWidth,
  searchEnabled,
  rowEvents,
  sideBarVisible = true,
  // exportEnabled,
  multiSelectEnabled,
  duplicateEnabled,
  onSelect,
  noDataMessage,
}) => {
  const [currentSelected, setCurrentSelected] = useState([selected])
  const [hideSelectColumn, setHideSelectColumn] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const defaultOnSelect = (row, isSelect, rowIndex, e) => {
    loadSingle(row, isSelect, rowIndex, e)

    if (isSelect) {
      if (hideSelectColumn) {
        setCurrentSelected([row.id])
      } else {
        if (currentSelected.indexOf(row.id) < 0) {
          setCurrentSelected([...currentSelected, row.id])
        }
      }
    } else {
      currentSelected.splice(currentSelected.indexOf(row.id), 1)
      setCurrentSelected(currentSelected)
    }

    if (hideSelectColumn && !isSelect) {
      setCurrentSelected([])
    }
  }

  const selectRow = {
    mode: hideSelectColumn ? 'radio' : 'checkbox',
    clickToSelect: true,
    hideSelectColumn: hideSelectColumn || !multiSelectEnabled,
    selected: currentSelected,
    onSelect: onSelect ? onSelect : defaultOnSelect,
    // TODO convert to class
    style: {
      // filter: "brightness(85%)",
      // boxShadow: "inset 0 0 10px 5px #dddddd",
      backgroundColor: '#ffe3be',
    },
  }

  const tableOptions = {
    hideSizePerPage: true,
    defaultSortName: 'lastName',
    defaultSortOrder: 'asc',
  }

  // TODO column wrapping when page not wide enough
  return (
    <ToolkitProvider
      keyField="id"
      columns={columns}
      data={data}
      options={tableOptions}
      bootstrap4
      // exportCSV
      // search
      // TODO pagination
    >
      {(props) => (
        <Container fluid>
          <Row className="d-flex justify-content-between">
            <Col xs={tableWidth}>
              <BootstrapTable
                {...props.baseProps}
                selectRow={selectRow}
                striped
                filter={filterFactory()}
                condensed
                hover
                rowEvents={rowEvents}
                rowStyle={{ backgroundColor: '#ffffff' }}
                rowClasses={'tbl-row'}
                headerClasses={'tbl-header'}
                noDataIndication={noDataMessage}
              />
            </Col>

            {sideBarVisible ? (
              <TableSidebar
                text={dataName}
                selected={selected}
                openAddModal={openAddModal}
                openEditModal={openEditModal}
                openDeleteModal={openDeleteModal}
                hideSelectColumn={hideSelectColumn}
                setHideSelectColumn={setHideSelectColumn}
                searchProps={props.searchProps}
                // csvProps={props.csvProps}
                width={sidebarWidth}
                searchEnabled={searchEnabled}
                // exportEnabled={exportEnabled}
                multiSelectEnabled={multiSelectEnabled}
                duplicateEnabled={duplicateEnabled}
              />
            ) : (
              <Col xs={8}>
                <div></div>
              </Col>
            )}
          </Row>
        </Container>
      )}
    </ToolkitProvider>
  )
}

DataTable.propTypes = {
  dataName: string.isRequired,
  data: array.isRequired,
  // columns: array.isRequired,
  selected: object,
  setSelected: func.isRequired,
  loadData: func.isRequired,
  loadSingle: func.isRequired,
  openAddModal: func.isRequired,
  openEditModal: func.isRequired,
  openDeleteModal: func.isRequired,
  tableWidth: number,
  sidebarWidth: number,
  searchEnabled: bool,
  // exportEnabled: bool,
  multiSelectEnabled: bool,
  duplicateEnabled: bool,
  onSelect: func,
  noDataMessage: string,
}

DataTable.defaultProps = {
  tableWidth: 10,
  sidebarWidth: 2,
  searchEnabled: true,
  // exportEnabled: true,
  multiSelectEnabled: true,
  duplicateEnabled: false,
  noDataMessage: 'No data found.',
}

export default DataTable

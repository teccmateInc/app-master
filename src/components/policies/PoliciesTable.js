import React, { useContext, useEffect } from 'react'
import { DataTable } from '../table'
import PoliciesContext from './PoliciesContext'
import PolicyInputForm from './PolicyInputForm'

const PoliciesTable = () => {
  const {
    singular,
    policies,
    columns,
    selectedPolicy,
    setSelectedPolicy,
    hoverIdx,
    setHoverIdx,
    loadPolicies,
    loadPolicy,
    openAddModal,
    openEditModal,
    openDeleteModal,
  } = useContext(PoliciesContext)

  let rowEvents = {
    onMouseEnter: (e, row, rowIndex) => {
      setHoverIdx(rowIndex)
    },
    onMouseLeave: () => {
      setHoverIdx(null)
    },
  }

  return (
    <>
      <DataTable
        dataName={singular}
        data={policies}
        columns={columns}
        rowEvents={rowEvents}
        selected={selectedPolicy}
        setSelected={setSelectedPolicy}
        loadData={loadPolicies}
        loadSingle={loadPolicy}
        openAddModal={openAddModal}
        sideBarVisible={false}
        tableWidth={12}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />
      <>{selectedPolicy && <PolicyInputForm />}</>
    </>
  )
}

export default PoliciesTable

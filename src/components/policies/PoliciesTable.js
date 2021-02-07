import React, { useContext } from 'react'
import { DataTable } from '../table'
import PoliciesContext from './PoliciesContext'

const PoliciesTable = () => {
  const {
    singular,
    policies,
    columns,
    selectedPolicy,
    setSelectedPolicy,
    loadPolicies,
    loadPolicy,
    openAddModal,
    openEditModal,
    openDeleteModal,
  } = useContext(PoliciesContext)

  return (
    <DataTable
      dataName={singular}
      data={policies}
      columns={columns}
      selected={selectedPolicy}
      setSelected={setSelectedPolicy}
      loadData={loadPolicies}
      loadSingle={loadPolicy}
      openAddModal={openAddModal}
      openEditModal={openEditModal}
      openDeleteModal={openDeleteModal}/>
  )
}

export default PoliciesTable

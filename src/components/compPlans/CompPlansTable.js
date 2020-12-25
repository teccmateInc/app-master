import React, { useContext } from 'react'
import { DataTable } from '../table'
import CompPlansContext from './CompPlansContext'
import { CarriersContext } from '../carriers'

const CompPlansTable = () => {
  const {
    singular,
    compPlans,
    columns,
    selectedCompPlan,
    setSelectedCompPlan,
    loadCompPlans,
    loadCompPlan,
    openAddModal,
    openEditModal,
    openDeleteModal,
  } = useContext(CompPlansContext)

  return (
    <DataTable
      dataName={singular}
      data={compPlans}
      columns={columns}
      selected={selectedCompPlan}
      setSelected={setSelectedCompPlan}
      loadData={loadCompPlans}
      loadSingle={loadCompPlan}
      openAddModal={openAddModal}
      openEditModal={openEditModal}
      openDeleteModal={openDeleteModal}
    />
  )
}

export default CompPlansTable

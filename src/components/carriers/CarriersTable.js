import React, { useContext } from 'react'
import DataTable from '../table/DataTable'
import CarriersContext from './CarriersContext'


const CarriersTable = () => {
    const {
        singular,
        carriers,
        columns,
        selectedCarrier,
        setSelectedCarrier,
        loadCarriers,
        loadCarrier,
        openAddModal,
        openEditModal,
        openDeleteModal,
    } = useContext(CarriersContext)

    return (
        <DataTable
            dataName={singular}
            data={carriers}
            columns={columns}
            selected={selectedCarrier}
            setSelected={setSelectedCarrier}
            loadData={loadCarriers}
            loadSingle={loadCarrier}
            openAddModal={openAddModal}
            openEditModal={openEditModal}
            openDeleteModal={openDeleteModal}
        />
    )
}

export default CarriersTable

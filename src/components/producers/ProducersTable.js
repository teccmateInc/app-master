import React, { useContext } from 'react'
import ProducersContext from '../producers/ProducersContext'
import DataTable from '../table/DataTable'


const ProducersTable = () => {
    const {
        singular,
        producers,
        columns,
        selectedProducer,
        setSelectedProducer,
        loadProducers,
        loadProducer,
        openAddModal,
        openEditModal,
        openDeleteModal,
    } = useContext(ProducersContext)

    return (
        <DataTable
            dataName={singular}
            data={producers}
            columns={columns}
            selected={selectedProducer}
            setSelected={setSelectedProducer}
            loadData={loadProducers}
            loadSingle={loadProducer}
            openAddModal={openAddModal}
            openEditModal={openEditModal}
            openDeleteModal={openDeleteModal}
        />
    )
}

export default ProducersTable

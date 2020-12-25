import React, { useContext } from 'react'
import DataTable from '../table/DataTable'
import ContactsContext from './ContactsContext'


const ContactsTable = () => {
    const {
        singular,
        contacts,
        columns,
        selectedContact,
        setSelectedContact,
        loadContacts,
        loadContact,
        openAddModal,
        openEditModal,
        openDeleteModal,
    } = useContext(ContactsContext)

    return (
        <DataTable
            dataName={singular}
            data={contacts}
            columns={columns}
            selected={selectedContact}
            setSelected={setSelectedContact}
            loadData={loadContacts}
            loadSingle={loadContact}
            openAddModal={openAddModal}
            openEditModal={openEditModal}
            openDeleteModal={openDeleteModal}
        />
    )
}

export default ContactsTable

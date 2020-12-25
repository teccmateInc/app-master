import { LoadingContext } from 'components/LoadingContext'
import { node } from 'prop-types'
import React, { useCallback, useContext, useState } from 'react'
import { deleteWrapper, fetchWrapper, postWrapper, putWrapper } from '../../helpers/api'
import { ModalContext } from '../../providers/modal'
import AddContactModal from './AddContactModal'
import ContactsContext from './ContactsContext'
import DeleteContactModal from './DeleteContactModal'
import EditContactModal from './EditContactModal'

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [detailedContacts, setDetailedContacts] = useState([])

  const loadingWrapper = useContext(LoadingContext)

  const { setModalContent, closeModal } = useContext(ModalContext)

  const singular = 'Contact'
  const plural = singular + 's'

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      hidden: true,
    },
    {
      dataField: 'firstName',
      text: 'First Name',
    },
    {
      dataField: 'middleName',
      text: 'Middle Name',
    },
    {
      dataField: 'lastName',
      text: 'Last Name',
    },
    {
      dataField: 'companyName',
      text: 'Company Name',
    }]

  const setDisplayName = contact => {
    contact.displayName =
      contact.firstName + ' ' +
      (contact.middleName ? contact.middleName + ' ' : '') +
      contact.lastName
    return contact
  }

  const loadContacts = useCallback(() => (
    loadingWrapper(
      async () => {
        try {
          const response = await fetchWrapper('/contacts')
          setContacts(response.content.map(setDisplayName))
        } catch (err) {
          toastr.error('Unable to load contacts.')
          throw err
        }
      },
    )
  ), [])

  const loadContact = useCallback((row, isSelect, rowIndex, e) => (
    loadingWrapper(
      async () => {
        if (isSelect) {
          try {
            setSelectedContact(row)
            const selectedResponse = await fetchWrapper('/contacts/' + row.id)
            setDetailedContacts([...detailedContacts, setDisplayName(selectedResponse)])
          } catch (err) {
            toastr.error('Unable to load contacts.')
            throw err
          }
        } else {
          setSelectedContact(null)
          setDetailedContacts(detailedContacts.filter(c => c.id !== row.id))
        }
      },
    )
  ), [selectedContact])

  const onAddSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          await postWrapper('/contacts', { ...data })
          closeModal()
          loadContacts()
          toastr.success('Contact created successfully.')
        } catch (err) {
          if (err.message) {
            toastr.error(err.message)
          } else {
            toastr.error('Unable to create contact ' + data.displayName + '.')
          }
          throw err
        }
      })
  }

  const onEditSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          await putWrapper('/contacts', {
            ...selectedContact,
            ...data,
          })
          closeModal()
          loadContacts()
          toastr.success('Contact updated.', 'Success', {
            timeOut: 0,
            extendedTimeOut: 0,
          })
        } catch (err) {
          toastr.error('Unable to update contact ' + selectedContact.displayName + '.')
          throw err
        }
      })
  }

  const onDeleteSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          await deleteWrapper('/contacts/' + selectedContact.id)
          closeModal()
          loadContacts()
          toastr.success('Contact deleted.', 'Success')
        } catch (err) {
          toastr.error('Unable to delete contact ' + selectedContact.displayName + '.')
          throw err
        }
      })
  }

  const openAddModal = useCallback(() => setModalContent(() => (
    <AddContactModal
      singular={singular}
      onSubmit={onAddSubmit}
      closeModal={closeModal}/>
  )))

  const openEditModal = useCallback(() => setModalContent(() => (
    <EditContactModal
      singular={singular}
      selected={selectedContact}
      onSubmit={onEditSubmit}
      closeModal={closeModal}/>
  )))

  const openDeleteModal = useCallback(() => setModalContent(() => (
    <DeleteContactModal
      singular={singular}
      detailed={detailedContacts}
      onSubmit={onDeleteSubmit}
      closeModal={closeModal}/>
  )))

  return (
    <ContactsContext.Provider
      value={{
        singular,
        plural,
        contacts,
        columns,
        selectedContact,
        setSelectedContact,
        detailedContacts,
        loadContacts,
        loadContact,
        openAddModal,
        openEditModal,
        openDeleteModal,
      }}>
      {children}
    </ContactsContext.Provider>
  )
}

ContactsProvider.propTypes = {
  children: node.isRequired,
}

export default ContactsProvider

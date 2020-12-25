import { LoadingContext } from 'components/LoadingContext'
import { node } from 'prop-types'
import React, { useCallback, useContext, useState } from 'react'
import { deleteWrapper, fetchWrapper, postWrapper, putWrapper } from '../../helpers/api'
import { ModalContext } from '../../providers/modal'
import AddCarrierModal from './AddCarrierModal'
import CarriersContext from './CarriersContext'
import DeleteCarrierModal from './DeleteCarrierModal'
import EditCarrierModal from './EditCarrierModal'

const CarriersProvider = ({ children }) => {
  const [carriers, setCarriers] = useState([])
  const [selectedCarrier, setSelectedCarrier] = useState(null)
  const [detailedCarriers, setDetailedCarriers] = useState([])

  const loadingWrapper = useContext(LoadingContext)

  const { setModalContent, closeModal } = useContext(ModalContext)

  const singular = 'Carrier'
  const plural = singular + 's'

  const columns = [
    { dataField: 'id', text: 'ID', hidden: true },
    { dataField: 'name', text: 'Carrier Name' },
  ]

  const setDisplayName = carrier => {
    carrier.displayName =
            carrier.firstName + ' ' +
            (carrier.middleName ? carrier.middleName + ' ' : '') +
            carrier.lastName
    return carrier
  }

  const loadCarriers = useCallback(() => (
    loadingWrapper(
      async () => {
        try {
          const response = await fetchWrapper('/carriers')
          setCarriers(response.content.map(setDisplayName))
        } catch (err) {
          toastr.error('Unable to load carriers.')
          throw err
        }
      }
    )
  ), [])

  const loadCarrier = useCallback((row, isSelect, rowIndex, e) => (
    loadingWrapper(
      async () => {
        if (isSelect) {
          try {
            setSelectedCarrier(row)
            const selectedResponse = await fetchWrapper('/carriers/' + row.id)
            setDetailedCarriers([...detailedCarriers, setDisplayName(selectedResponse)])
          } catch (err) {
            toastr.error('Unable to load carriers.')
            throw err
          }
        } else {
          setSelectedCarrier(null)
          setDetailedCarriers(detailedCarriers.filter(c => c.id !== row.id))
        }
      }
    )
  ), [selectedCarrier])

  const onAddSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          const response =
                        await postWrapper('/carriers', { ...data })
          closeModal()
          loadCarriers()
          toastr.success('Carrier created successfully.')
        } catch (err) {
          if (err.message) {
            toastr.error(err.message)
          } else {
            toastr.error('Unable to create carrier ' +
                                         data.firstName + ' ' +
                                         data.lastName + '.')
          }
          throw err
        }
      })
  }

  const onEditSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          const response =
                        await putWrapper('/carriers', { ...selectedCarrier, ...data })
          closeModal()
          loadCarriers()
          toastr.success('Carrier updated.', 'Success', {
            timeOut: 0,
            extendedTimeOut: 0,
          })
        } catch (err) {
          toastr.error('Unable to update carrier ' +
                                     selectedCarrier.firstName + ' ' +
                                     selectedCarrier.lastName + '.')
          throw err
        }
      })
  }

  const onDeleteSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          const response = await deleteWrapper('/carriers/' + selectedCarrier.id)
          closeModal()
          loadCarriers()
          toastr.success('Carrier deleted.', 'Success')
        } catch (err) {
          toastr.error('Unable to delete carrier ' +
                                     selectedCarrier.firstName + ' ' +
                                     selectedCarrier.lastName + '.')
          throw err
        }
      })
  }

  const openAddModal = useCallback(() => setModalContent(() => (
    <AddCarrierModal
      singular={singular}
      onSubmit={onAddSubmit}
      closeModal={closeModal}/>
  )))

  const openEditModal = useCallback(() => setModalContent(() => (
    <EditCarrierModal
      singular={singular}
      selected={selectedCarrier}
      onSubmit={onEditSubmit}
      closeModal={closeModal}/>
  )))

  const openDeleteModal = useCallback(() => setModalContent(() => (
    <DeleteCarrierModal
      singular={singular}
      detailed={detailedCarriers}
      onSubmit={onDeleteSubmit}
      closeModal={closeModal}/>
  )))

  return (
    <CarriersContext.Provider
      value={{
        singular,
        plural,
        carriers,
        columns,
        selectedCarrier,
        setSelectedCarrier,
        detailedCarriers,
        loadCarriers,
        loadCarrier,
        openAddModal,
        openEditModal,
        openDeleteModal,
      }}>
      {children}
    </CarriersContext.Provider>
  )
}

CarriersProvider.propTypes = {
  children: node.isRequired,
}

export default CarriersProvider

import { LoadingContext } from 'components/LoadingContext'
import { node } from 'prop-types'
import React, { useCallback, useContext, useState } from 'react'
import { deleteWrapper, fetchWrapper, postWrapper, putWrapper } from '../../helpers/api'
import { ModalContext } from '../../providers/modal'
import AddProducerModal from '../producers/AddProducerModal'
import DeleteProducerModal from '../producers/DeleteProducerModal'
import EditProducerModal from '../producers/EditProducerModal'
import ProducersContext from '../producers/ProducersContext'

const ProducersProvider = ({ children }) => {
  const [producers, setProducers] = useState([])
  const [selectedProducer, setSelectedProducer] = useState(null)
  const [detailedProducers, setDetailedProducers] = useState([])

  const loadingWrapper = useContext(LoadingContext)

  const { setModalContent, closeModal } = useContext(ModalContext)

  const singular = 'Producer'
  const plural = 'Producers'

  const columns = [
    { dataField: 'id', text: 'ID', hidden: true },
    { dataField: 'firstName', text: 'First Name' },
    { dataField: 'middleName', text: 'Middle Name' },
    { dataField: 'lastName', text: 'Last Name' },
  ]

  const setDisplayName = producer => {
    producer.displayName =
            producer.firstName + ' ' +
            (producer.middleName ? producer.middleName + ' ' : '') +
            producer.lastName
    return producer
  }

  const loadProducers = useCallback(() => (
    loadingWrapper(
      async () => {
        try {
          const response = await fetchWrapper('/producers')
          setProducers(response.content.map(setDisplayName))
        } catch (err) {
          toastr.error('Unable to load producers.')
          throw err
        }
      }
    )
  ), [])

  const loadProducer = useCallback((row, isSelect, rowIndex, e) => (
    loadingWrapper(
      async () => {
        if (isSelect) {
          try {
            setSelectedProducer(row)
            const selectedResponse = await fetchWrapper('/producers/' + row.id)
            setDetailedProducers([...detailedProducers, setDisplayName(selectedResponse)])
          } catch (err) {
            toastr.error('Unable to load producers.')
            throw err
          }
        } else {
          setSelectedProducer(null)
          setDetailedProducers(detailedProducers.filter(c => c.id !== row.id))
        }
      }
    )
  ), [selectedProducer])

  const onAddSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          await postWrapper('/producers', {
            ...data,
          })

          closeModal()
          loadProducers()
          toastr.success('Producer created successfully.')
          // console.trace('end onSubmit')
        } catch (err) {
          if (err.message) {
            toastr.error(err.message)
          } else {
            toastr.error('Unable to create producer ' + data.displayName + '.')
          }
          throw err
        }
      })
  }

  const onEditSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          // console.trace('data', data)
          // console.trace('start onSubmit')
          // console.trace('body', {
          //     ...selectedProducer,
          //     ...data,
          // })
          const response =
                        await putWrapper('/producers', {
                          ...selectedProducer,
                          ...data,
                        })
          closeModal()
          loadProducers()
          toastr.success('Producer updated.', 'Success', {
            timeOut: 0,
            extendedTimeOut: 0,
          })
          // console.trace('end onSubmit')
        } catch (err) {
          toastr.error('Unable to update producer ' +
                                     selectedProducer.firstName + ' ' +
                                     selectedProducer.lastName + '.')
          throw err
        }
      })
  }

  const onDeleteSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          // console.trace("data", data)
          // console.trace("start onSubmit")
          // console.trace("body", {
          //     ...selectedProducer,
          //     ...data,
          // })
          const response = await deleteWrapper('/producers/' + selectedProducer.id)
          closeModal()
          loadProducers()
          toastr.success('Producer deleted.', 'Success')
          // console.trace("end onSubmit")
        } catch (err) {
          toastr.error('Unable to delete producer ' +
                                     selectedProducer.firstName + ' ' +
                                     selectedProducer.lastName + '.')
          throw err
        }
      })
  }

  const openAddModal = useCallback(() => {
    setModalContent(() => (
      <AddProducerModal
        singular={singular}
        onSubmit={onAddSubmit}
        closeModal={closeModal}/>
    ))
  })
  const openEditModal = useCallback(() => setModalContent(() => (
    <EditProducerModal
      singular={singular}
      selected={selectedProducer}
      onSubmit={onEditSubmit}
      closeModal={closeModal}/>
  )))
  const openDeleteModal = useCallback(() => setModalContent(() => (
    <DeleteProducerModal
      singular={singular}
      detailed={detailedProducers}
      onSubmit={onDeleteSubmit}
      closeModal={closeModal}/>
  )))

  return (
    <ProducersContext.Provider
      value={{
        singular,
        plural,
        producers,
        columns,
        selectedProducer,
        setSelectedProducer,
        detailedProducers,
        loadProducers,
        loadProducer,
        openAddModal,
        openEditModal,
        openDeleteModal,
      }}>
      {children}
    </ProducersContext.Provider>
  )
}

ProducersProvider.propTypes = {
  children: node.isRequired,
}

export default ProducersProvider

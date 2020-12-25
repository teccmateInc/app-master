import { LoadingContext } from 'components/LoadingContext'
import { node } from 'prop-types'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  deleteWrapper,
  fetchWrapper,
  postWrapper,
  putWrapper,
} from '../../helpers/api'
import { ModalContext } from '../../providers/modal'
import AddPolicyModal from './AddPolicyModal'
import PoliciesContext from './PoliciesContext'
import DeletePolicyModal from './DeletePolicyModal'
import EditPolicyModal from './EditPolicyModal'
import ProductsProvider from '../products/ProductsProvider'
import { textFilter } from 'react-bootstrap-table2-filter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCopy, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const PoliciesProvider = ({ children }) => {
  const [policies, setPolicies] = useState([])
  const [edit, setEdit] = useState(null)
  const [selectedPolicy, setSelectedPolicy] = useState(null)
  const [detailedPolicies, setDetailedPolicies] = useState([])

  const loadingWrapper = useContext(LoadingContext)

  const { setModalContent, closeModal } = useContext(ModalContext)

  const singular = 'Policy'
  const plural = 'Policies'

  useEffect(() => {
    console.log(edit, selectedPolicy)
  }, [selectedPolicy, edit])

  const [hoverIdx, setHoverIdx] = useState(null)
  let actionFormatter = (cell, row, rowIndex, { hoverIdx }) => {
    if (
      (hoverIdx !== null || hoverIdx !== undefined) &&
      hoverIdx === rowIndex
    ) {
      return (
        <div
          className="d-flex"
          style={{
            justifyContent: 'space-around',
            position: 'relative',
            top: '.3rem',
            color: '#0035ffad',
          }}
          onClick={() => setEdit(true)}
        >
          <>
            <FontAwesomeIcon
              onClick={() => setEdit(true)}
              icon={faEdit}
              style={{
                cursor: 'pointer',
              }}
            />
            <FontAwesomeIcon
              onClick={() => setEdit(true)}
              icon={faCopy}
              style={{
                cursor: 'pointer',
              }}
            />
            <FontAwesomeIcon
              onClick={() => setEdit(true)}
              icon={faTrashAlt}
              style={{
                cursor: 'pointer',
              }}
            />
          </>
        </div>
      )
    }
    return ''
  }

  let style = { placeholder: 'Search', style: { borderRadius: '0' } }
  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      hidden: true,
      filter: textFilter(style),
    },
    {
      dataField: 'policyNumber',
      text: 'Policy No.',
      filter: textFilter(style),
    },
    {
      dataField: 'clientName',
      text: 'Client',
      filter: textFilter(style),
    },
    {
      dataField: 'companyName',
      text: 'Company',
      filter: textFilter(style),
    },
    {
      dataField: 'carrierName',
      text: 'Carrier',
      filter: textFilter(style),
    },
    { dataField: 'product', text: 'Product', filter: textFilter(style) },
    { dataField: 'productType', text: 'Type', filter: textFilter(style) },
    {
      dataField: 'effectiveDate',
      text: 'Effective Date',
      filter: textFilter(style),
    },
    {
      dataField: 'premium',
      text: 'Premium/Fee',
      filter: textFilter(style),
    },
    { dataField: 'paymentMode', text: 'Mode', filter: textFilter(style) },
    {
      dataField: 'annualizedPremium',
      text: 'Ann. Premium',
      filter: textFilter(style),
    },
    {
      dataField: 'actions',
      text: 'Actions',
      formatter: actionFormatter,
      formatExtraData: { hoverIdx: hoverIdx },
    },
  ]

  // const setDisplayName = policy => {
  //   policy.displayName = policy.policyNumber
  //   return policy
  // }

  const loadPolicies = useCallback(
    () =>
      loadingWrapper(async () => {
        try {
          const response = await fetchWrapper('/policies')
          // setPolicies(response.map(setDisplayName))
          setPolicies(response.content)
        } catch (err) {
          toastr.error('Unable to load policies.')
          throw err
        }
      }),
    []
  )

  const loadPolicy = useCallback(
    (row, isSelect, rowIndex, e) =>
      loadingWrapper(async () => {
        if (isSelect) {
          try {
            setSelectedPolicy(row)
            const selectedResponse = await fetchWrapper('/policies/' + row.id)
            // setDetailedPolicies([...detailedPolicies, setDisplayName(selectedResponse)])
            setDetailedPolicies([...detailedPolicies, selectedResponse])
          } catch (err) {
            toastr.error('Unable to load policies.')
            throw err
          }
        } else {
          setSelectedPolicy(null)
          setDetailedPolicies(detailedPolicies.filter((c) => c.id !== row.id))
        }
      }),
    [selectedPolicy]
  )

  const onAddSubmit = (data) => {
    loadingWrapper(async () => {
      try {
        await postWrapper('/policies', {
          ...data,
        })
        closeModal()
        loadPolicies()
        toastr.success('Policy created successfully.')
      } catch (err) {
        if (err.message) {
          toastr.error(err.message)
        } else {
          toastr.error('Unable to create policy ' + data.displayName + '.')
        }
        throw err
      }
    })
  }

  const onEditSubmit = (data) => {
    loadingWrapper(async () => {
      try {
        await putWrapper('/policies', {
          ...selectedPolicy,
          ...data,
        })
        closeModal()
        loadPolicies()
        toastr.success('Policy updated.', 'Success', {
          timeOut: 0,
          extendedTimeOut: 0,
        })
      } catch (err) {
        toastr.error(
          'Unable to update policy ' + selectedPolicy.displayName + '.'
        )
        throw err
      }
    })
  }

  const onDeleteSubmit = (data) => {
    loadingWrapper(async () => {
      try {
        const response = await deleteWrapper('/policies/' + selectedPolicy.id)
        closeModal()
        loadPolicies()
        toastr.success('Policy deleted.', 'Success')
      } catch (err) {
        toastr.error(
          'Unable to delete policy ' + selectedPolicy.displayName + '.'
        )
        throw err
      }
    })
  }

  const openAddModal = useCallback(() =>
    setModalContent(() => (
      <ProductsProvider>
        <AddPolicyModal
          singular={singular}
          onSubmit={onAddSubmit}
          closeModal={closeModal}
        />
      </ProductsProvider>
    ))
  )

  const openEditModal = useCallback(() =>
    setModalContent(() => (
      <EditPolicyModal
        singular={singular}
        selected={selectedPolicy}
        onSubmit={onEditSubmit}
        closeModal={closeModal}
      />
    ))
  )

  const openDeleteModal = useCallback(() =>
    setModalContent(() => (
      <DeletePolicyModal
        singular={singular}
        detailed={detailedPolicies}
        onSubmit={onDeleteSubmit}
        closeModal={closeModal}
      />
    ))
  )

  return (
    <PoliciesContext.Provider
      value={{
        singular,
        plural,
        policies,
        columns,
        selectedPolicy,
        setSelectedPolicy,
        detailedPolicies,
        loadPolicies,
        loadPolicy,
        hoverIdx,
        setHoverIdx,
        openAddModal,
        openEditModal,
        openDeleteModal,
      }}
    >
      {children}
    </PoliciesContext.Provider>
  )
}

PoliciesProvider.propTypes = {
  children: node.isRequired,
}

export default PoliciesProvider

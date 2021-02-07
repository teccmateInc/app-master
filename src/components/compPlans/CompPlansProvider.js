import { LoadingContext } from 'components/LoadingContext'
import { node } from 'prop-types'
import React, { useCallback, useContext, useState, forwardRef } from 'react'
import Badge from 'react-bootstrap/Badge'
import { deleteWrapper, fetchWrapper, postWrapper, putWrapper } from '../../helpers/api'
import { ModalContext } from '../../providers/modal'
import CarriersContext from '../carriers/CarriersContext.js'
import TooltipWrapper from '../TooltipWrapper'
import AddCompPlanModal from './AddCompPlanModal'
import CompPlansContext from './CompPlansContext'
import DeleteCompPlanModal from './DeleteCompPlanModal'
import EditCompPlanModal from './EditCompPlanModal'

const CompPlansProvider = ({ children }) => {
  const loadingWrapper = useContext(LoadingContext)
  const { setModalContent, closeModal } = useContext(ModalContext)

  const {
    carriers,
    loadCarriers,
  } = useContext(CarriersContext)

  const [compPlans, setCompPlans] = useState([])
  const [compPlanTypes, setCompPlanTypes] = useState(null)
  const [selectedCompPlan, setSelectedCompPlan] = useState(null)

  const singular = 'CompPlan'
  const plural = singular + 's'

  const carriersFormatter = (cell, row, rowIndex, formatExtraData) => {
    if (cell.length == 0) {
      return 'all'
    } else if (cell.length == 1) {
      return cell[0].name
    } else {
      return cell[0].name + ' and ' + (cell.length - 1) + ' more'
    }
  }

  const nameFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        {cell}
        <TooltipWrapper
          triggerId={'comp-plan-policy-count-' + row.id}
          tooltip={'Policy count: ' + row.policyCount}
          TriggerComp={forwardRef((props, ref) => {
            return (
              <>
                <Badge ref={ref} {...props} variant="light">{row.policyCount}</Badge>
                <span className="sr-only">unread messages</span>
              </>
            );
          })}
        />
      </div>
    )
  }

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      hidden: true,
    },
    {
      dataField: 'name',
      text: 'Name',
      formatter: nameFormatter,
    },
    {
      dataField: 'carriers',
      text: 'Carriers',
      formatter: carriersFormatter,
    },
    {
      dataField: 'description',
      text: 'Description',
    },
    {
      dataField: 'typeName',
      text: 'Type',
    },
  ]

  const renderCarrier = (carrier) => (
    <div>
      ABC = carrier.name
      {/*<img*/}
      {/*  alt={option.login}*/}
      {/*  src={option.avatar_url}*/}
      {/*  style={{*/}
      {/*    height: '24px',*/}
      {/*    marginRight: '10px',*/}
      {/*    width: '24px',*/}
      {/*  }}/>*/}
      {/*<span>{option.login}</span>*/}
    </div>
  )

  const loadCompPlanTypes = useCallback(() => (
    loadingWrapper(
      async () => {
        try {
          const response = await fetchWrapper('/comp-plans/types')
          setCompPlanTypes(response)
        } catch (err) {
          toastr.error('Unable to load products.')
          throw err
        }
      },
    )
  ), [])

  const loadCompPlans = useCallback(() => (
    loadingWrapper(
      async () => {
        try {
          const response = await fetchWrapper('/comp-plans')
          setCompPlans(response.content)
        } catch (err) {
          toastr.error('Unable to load compPlans.')
          throw err
        }
      },
    )
  ), [])

  const loadCompPlan = useCallback((row, isSelect, rowIndex, e) => (
    loadingWrapper(
      async () => {
        if (isSelect) {
          try {
            var path = '/comp-plans/'
            if (row.type === 'F') {
              path = path + 'fee/'
            } else if (row.type === 'G') {
              path = path + 'graded/'
            } else if (row.type === 'MA') {
              path = path + 'mapdp/'
            } else if (row.type === 'P') {
              path = path + 'pct-premium/'
            } else if (row.type === 'T') {
              path = path + 'target-premium/'
            } else {
              throw new Error('Unknown plan type "' + row.type + '".')
            }

            setSelectedCompPlan(row)
            const selectedResponse = await fetchWrapper(path + row.id)
            // setDetailedCompPlans([...detailedCompPlans, setDisplayName(selectedResponse)])
          } catch (err) {
            toastr.error('Unable to load compPlans.')
            throw err
          }
        } else {
          setSelectedCompPlan(null)
          // setDetailedCompPlans(detailedCompPlans.filter(c => c.id !== row.id))
        }
      },
    )
  ), [selectedCompPlan])

  const onAddSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          await postWrapper('/comp-plans', { ...data })
          closeModal()
          loadCompPlans()
          toastr.success('CompPlan created successfully.')
        } catch (err) {
          if (err.message) {
            toastr.error(err.message)
          } else {
            toastr.error('Unable to create compPlan ' + data.displayName + '.')
          }
          throw err
        }
      })
  }

  const onEditSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          await putWrapper('/comp-plans', {
            ...selectedCompPlan,
            ...data,
          })
          closeModal()
          loadCompPlans()
          toastr.success('CompPlan updated.', 'Success', {
            timeOut: 0,
            extendedTimeOut: 0,
          })
        } catch (err) {
          toastr.error('Unable to update compPlan ' + selectedCompPlan.displayName + '.')
          throw err
        }
      })
  }

  const onDeleteSubmit = data => {
    loadingWrapper(
      async () => {
        try {
          await deleteWrapper('/comp-plans/' + selectedCompPlan.id)
          closeModal()
          loadCompPlans()
          toastr.success('CompPlan deleted.', 'Success')
        } catch (err) {
          toastr.error('Unable to delete compPlan ' + selectedCompPlan.displayName + '.')
          throw err
        }
      })
  }

  const openAddModal = useCallback(() => {
    loadCompPlanTypes()
    console.log("compPlanTypes",compPlanTypes)

    setModalContent(() => (
      <AddCompPlanModal
        singular={singular}
        onSubmit={onAddSubmit}
        closeModal={closeModal}
        carriers={carriers}
        loadCarriers={loadCarriers}
        renderCarrier={renderCarrier}
      />
    ))
  })

  const openEditModal = useCallback(() => {
    loadCompPlanTypes()

    setModalContent(() => (
      <EditCompPlanModal
        singular={singular}
        selected={selectedCompPlan}
        onSubmit={onEditSubmit}
        closeModal={closeModal}
        compPlanTypes={compPlanTypes}
      />
    ))
  })

  const openDeleteModal = useCallback(() => setModalContent(() => (
    <DeleteCompPlanModal
      singular={singular}
      detailed={detailedCompPlans}
      onSubmit={onDeleteSubmit}
      closeModal={closeModal}/>
  )))

  return (
    <CompPlansContext.Provider
      value={{
        singular,
        plural,
        compPlans,
        compPlanTypes,
        columns,
        selectedCompPlan,
        setSelectedCompPlan,
        // detailedCompPlans,
        loadCompPlans,
        loadCompPlan,
        openAddModal,
        openEditModal,
        openDeleteModal,
      }}>
      {children}
    </CompPlansContext.Provider>
  )
}

CompPlansProvider.propTypes = {
  children: node.isRequired,
}

export default CompPlansProvider

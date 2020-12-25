import { LoadingContext } from 'components/LoadingContext'
import { func, object, string } from 'prop-types'
import React, { useContext } from 'react'
import { DeleteModal } from '../modals'

const DeleteContactModal = ({
  singular,
  detailed,
  onSubmit,
  closeModal,
}) => {
  const message = `This Client is affiliated with ${detailed.policyCount} policies.
            Deleting this Client will delete all policies affiliated with it.`

  return (
    <DeleteModal
      title={`Delete ${singular}`}
      name={detailed.displayName}
      warn={detailed.policyCount > 0}
      message={message}
      submitModal={onSubmit}
      closeModal={closeModal}/>
  )
}

DeleteContactModal.propTypes = {
  singular: string.isRequired,
  detailed: object.isRequired,
  onSubmit: func.isRequired,
  closeModal: func.isRequired,
}

export default DeleteContactModal

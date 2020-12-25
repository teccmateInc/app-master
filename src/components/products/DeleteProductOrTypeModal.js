import { func, object, string } from 'prop-types'
import React from 'react'
import { DeleteModal } from '../modals'

const DeleteProductOrTypeModal = ({
  singular,
  selected,
  onSubmit,
  closeModal,
}) => {
  const message = `This ${singular} is affiliated with ${selected.policyCount} policies.
            Deleting this ${singular} will delete all policies affiliated with it.`

  return (
    <DeleteModal
      title={`Delete ${singular}`}
      name={selected.displayName}
      warn={selected.policyCount > 0}
      message={message}
      submitModal={onSubmit}
      closeModal={closeModal}/>
  )
}

DeleteProductOrTypeModal.propTypes = {
  singular: string.isRequired,
  selected: object.isRequired,
  onSubmit: func.isRequired,
  closeModal: func.isRequired,
}

export default DeleteProductOrTypeModal

import { LoadingContext } from 'components/LoadingContext'
import { func, object, string } from 'prop-types'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import BasicTextField from '../form_controls/BasicTextField'
import { AddEditModal } from '../modals'

const EditCarrierModal = ({
  singular,
  selected,
  onSubmit,
  closeModal,
}) => {
  const { control, handleSubmit, errors } = useForm({ mode: 'onBlur' })

  return (
    <AddEditModal
      title={`Edit ${singular}`}
      submitModal={handleSubmit(onSubmit)}
      closeModal={closeModal}
      body={<div>
        <BasicTextField
          control={control}
          errors={errors}
          name='name'
          label='Carrier Name'
          defaultValue={`${selected.name}`}
          rules={{ 
            required: true, 
            minLength: { 
              value: 3, 
              message: 'Minimum length of input should be 3' 
            } 
          }}
          autoFocus={true}/>
      </div>}/>
  )
}

EditCarrierModal.propTypes = {
  singular: string.isRequired,
  selected: object.isRequired,
  onSubmit: func.isRequired,
  closeModal: func.isRequired,
}

export default EditCarrierModal

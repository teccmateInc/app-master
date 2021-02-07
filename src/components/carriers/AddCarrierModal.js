import { LoadingContext } from 'components/LoadingContext'
import { func, string } from 'prop-types'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import BasicTextField from '../form_controls/BasicTextField'
import { AddEditModal } from '../modals'

const AddCarrierModal = ({
  singular,
  onSubmit,
  closeModal,
}) => {
  const { control, handleSubmit, errors } = useForm({ mode: 'onBlur' })

  return (
    <AddEditModal
      title={`Add ${singular}`}
      submitModal={handleSubmit(onSubmit)}
      closeModal={closeModal}
      body={<div>
        <BasicTextField
          control={control}
          errors={errors}
          name='name'
          label='Carrier Name'
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

AddCarrierModal.propTypes = {
  singular: string.isRequired,
  onSubmit: func.isRequired,
  closeModal: func.isRequired,
}

export default AddCarrierModal

import { LoadingContext } from 'components/LoadingContext'
import { func, string } from 'prop-types'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import BasicTextField from '../form_controls/BasicTextField'
import { AddEditModal } from '../modals'

const AddProductModal = ({
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
          label='Product Name'
          rules={{ required: true }}
          autoFocus={true}/>
      </div>}/>
  )
}

AddProductModal.propTypes = {
  singular: string.isRequired,
  onSubmit: func.isRequired,
  closeModal: func.isRequired,
}

export default AddProductModal

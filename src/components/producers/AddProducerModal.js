import { LoadingContext } from 'components/LoadingContext'
import { func, string } from 'prop-types'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import BasicTextField from '../form_controls/BasicTextField'
import { AddEditModal } from '../modals'

const AddProducerModal = ({
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
          name='firstName'
          label='First Name'
          rules={{ required: true }}
          autoFocus={true}/>
        {/* TODO make autoFocus work again */}
        <BasicTextField
          control={control}
          errors={errors}
          name='middleName'
          label='Middle Name'/>
        <BasicTextField
          control={control}
          errors={errors}
          name='lastName'
          label='Last Name'
          rules={{ required: true }}/>
      </div>}/>
  )
}

AddProducerModal.propTypes = {
  singular: string.isRequired,
  onSubmit: func.isRequired,
  closeModal: func.isRequired,
}

export default AddProducerModal

import { array, func, string } from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { AddEditModal } from '../modals'
import { AsyncTypeaheadField, BasicTextField } from '../form_controls'
import TypeaheadField from '../form_controls/TypeaheadField.js'

const AddCompPlanModal = ({
  singular,
  onSubmit,
  closeModal,
  carriers,
  loadCarriers,
  renderCarrier,
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
          label='Name'
          rules={{ required: true }}
          autoFocus={true}/>
        {/* TODO make autoFocus work again */}
        <TypeaheadField
          control={control}
          errors={errors}
          name='carrierId'
          label='Carrier'
          data={carriers}
          loadData={loadCarriers}
          renderFunction={renderCarrier}
          multiple={true}
        />
        <BasicTextField
          control={control}
          errors={errors}
          name='description'
          label='Description'/>
        <BasicTextField
          control={control}
          errors={errors}
          name='middleName'
          label='Middle Name'/>
      </div>}/>
  )
}

AddCompPlanModal.propTypes = {
  singular: string.isRequired,
  onSubmit: func.isRequired,
  closeModal: func.isRequired,
  carriers: array.isRequired,
  loadCarriers: func.isRequired,
  renderCarrier: func.isRequired,
}

export default AddCompPlanModal

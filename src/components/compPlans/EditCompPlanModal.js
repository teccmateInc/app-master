import { LoadingContext } from 'components/LoadingContext'
import { func, object, string } from 'prop-types'
import React, { useContext } from 'react'
import { Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import {BasicTextField,DropdownField} from '../form_controls'
import { AddEditModal } from '../modals'
import ProductsContext from '../products/ProductsContext.js'
import CompPlansContext from './CompPlansContext.js'

const EditCompPlanModal = ({
  singular,
  selected,
  onSubmit,
  closeModal,
  compPlanTypes,
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
          label='Name'
          defaultValue={`${selected.name}`}
          rules={{ required: true }}
          autoFocus={true}/>
        <DropdownField
          control={control}
          errors={errors}
          name='type'
          label='Type'
          data={compPlanTypes}
          defaultValue={`${selected.type}`}
          rules={{ required: true }}
          renderFunction={d => `<option>${d.mode}</option>`}
          />
        {/*<DropdownField*/}
        {/*  control={control}*/}
        {/*  errors={errors}*/}
        {/*  name='carriers'*/}
        {/*  label='Carriers'*/}
        {/*  defaultValue={`${selected.carriers}`}*/}
        {/*  rules={{ required: true }}*/}
        {/*  autoFocus={true}/>*/}
        <BasicTextField
          control={control}
          errors={errors}
          name='firstName'
          label='First Name'
          defaultValue={`${selected.firstName}`}
          rules={{ required: true }}
          autoFocus={true}/>
        {/* TODO make autoFocus work again */}
        <BasicTextField
          control={control}
          errors={errors}
          name='middleName'
          label='Description'
          defaultValue={`${selected.description}`}/>
        <BasicTextField
          control={control}
          errors={errors}
          name='lastName'
          label='Last Name'
          defaultValue={`${selected.lastName}`}
          rules={{ required: true }}/>
        <BasicTextField
          control={control}
          errors={errors}
          name='companyName'
          label='Company Name'
          defaultValue={`${selected.companyName}`}/>
      </div>}/>
  )
}

EditCompPlanModal.propTypes = {
  singular: string.isRequired,
  selected: object.isRequired,
  onSubmit: func.isRequired,
  closeModal: func.isRequired,
  compPlanTypes: object.isRequired,
}

export default EditCompPlanModal

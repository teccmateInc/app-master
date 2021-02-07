import { func, object, string } from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import BasicTextField from '../form_controls/BasicTextField'
import { AddEditModal } from '../modals'
import { Col, Container, Row } from 'react-bootstrap'
import {AsyncTypeaheadField} from '../form_controls'

const EditPolicyModal = ({
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
      body={<Container>
        <Row>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='carrierName'
              label='Carrier'
              defaultValue={`${selected.carrierName}`}/>
          </Col>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='policyNumber'
              label='Policy Number'
              defaultValue={`${selected.policyNumber}`}/>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <AsyncTypeaheadField
              control={control}
              errors={errors}
              name='agentNumber'
              label='Primary Agent'
              rules={{ required: true }}
              defaultValue={`${selected.agentNumber}`}/>
          </Col>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='premium'
              label='Premium'
              rules={{ required: true }}
              defaultValue={`${selected.premium}`}/>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='compPlan'
              label='Comp Plan (?)'
              defaultValue={`${selected.compPlanName}`}/>
          </Col>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='paymentMode'
              label='Mode'
              rules={{ required: true }}
              defaultValue={`${selected.paymentMode}`}/>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='product'
              label='Product'
              rules={{ required: true }}
              defaultValue={selected.productName && `${selected.productName}` || ''}/>
          </Col>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='effectiveDate'
              label='Effective Date'
              defaultValue={`${selected.effectiveDate}`}/>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='productType'
              label='Product Type'
              rules={{ required: true }}
              defaultValue={selected.productTypeName && `${selected.productTypeName}` || ''}/>
          </Col>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='status'
              label='Status'
              defaultValue={`${selected.policyStatus}`}/>
          </Col>
        </Row>
        {status === 'T' && <Row>
          <Col md={6}/>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='termDate'
              label='Term Date'
              defaultValue={`${selected.termDate}`}/>
          </Col>
        </Row>}
      </Container>}/>
  )
}

EditPolicyModal.propTypes = {
  singular: string.isRequired,
  selected: object.isRequired,
  onSubmit: func.isRequired,
  closeModal: func.isRequired,
}

export default EditPolicyModal

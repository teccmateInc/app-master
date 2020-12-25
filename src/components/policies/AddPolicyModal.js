import { func, string } from 'prop-types'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BasicTextField, DropdownField, TypeaheadField } from '../form_controls'
import { AddEditModal } from '../modals'
import { Col, Container, Row } from 'react-bootstrap'
import {AsyncTypeaheadField} from '../form_controls'
import ProductsContext from '../products/ProductsContext'

const AddPolicyModal = ({
  singular,
  onSubmit,
  closeModal,
}) => {
  const { control, handleSubmit, errors } = useForm({ mode: 'onBlur' })

  const {
    products,
    loadProducts,
  } = useContext(ProductsContext)

  useEffect(
    () => {
      loadProducts()
    }, [])

  return (
    <AddEditModal
      title={`Add ${singular}`}
      submitModal={handleSubmit(onSubmit)}
      closeModal={closeModal}
      body={<Container>
        <Row>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='carrierName'
              label='Carrier'/>
          </Col>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='policyNumber'
              label='Policy Number'/>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <AsyncTypeaheadField
              control={control}
              errors={errors}
              name='agentNumber'
              label='Primary Agent'
              rules={{ required: true }}/>
          </Col>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='premium'
              label='Premium'
              rules={{ required: true }}/>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='compPlan'
              label='Comp Plan (?)'/>
          </Col>
          <Col md={6}>
            <DropdownField
              control={control}
              errors={errors}
              name='paymentMode'
              label='Mode'
              data={products}
              rules={{ required: true }}
              renderFunction={d => `<option>${d.mode}</option>`}/>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TypeaheadField
              control={control}
              errors={errors}
              name='product'
              label='Product/Type'
              data={products}
              labelKey='name'
              renderFunction={option => (
                <div>
                  {option.name}
                  <div>
                    <small>Product/Type: {option.name}</small>
                  </div>
                </div>
              )}/>
          </Col>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='effectiveDate'
              label='Effective Date'/>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='productType'
              label='Product Type'
              rules={{ required: true }}/>
          </Col>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='status'
              label='Status'/>
          </Col>
        </Row>
        {status === 'T' && <Row>
          <Col md={6}/>
          <Col md={6}>
            <BasicTextField
              control={control}
              errors={errors}
              name='termDate'
              label='Term Date'/>
          </Col>
        </Row>}
      </Container>}/>
  )
}

AddPolicyModal.propTypes = {
  singular: string.isRequired,
  onSubmit: func.isRequired,
  closeModal: func.isRequired,
}

export default AddPolicyModal

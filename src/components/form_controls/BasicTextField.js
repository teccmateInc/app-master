import { bool, func, number, object, string } from 'prop-types'
import React from 'react'
import { Col, Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'

const BasicTextField = ({
  control,
  errors,
  name,
  label,
  fieldSize,
  labelSize,
  defaultValue,
  rules,
  autoFocus,
}) => {
  return (
    <div>
      <Form.Row
        className={errors[name] && 'error' || ''}
        validationstate={errors[name] && 'error'}>
        <Col
          as={Form.Label}
          sm={labelSize}>
          {label}
        </Col>
        <Col sm={fieldSize}
          style={{
            paddingBottom: '.25em',
          }}>
          <Controller
            as={Form.Control}
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            placeholder={label}/>
        </Col>
      </Form.Row>
      {
        errors[name] &&
                <Form.Row>
                  <Col sm={{ span: fieldSize, offset: labelSize }}
                    style={{
                      paddingLeft: '.75em',
                      paddingBottom: '.5em',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Form.Text
                      muted={true}
                      style={{ color: 'red' }}>Your input is required</Form.Text>
                  </Col>
                </Form.Row>
      }
    </div>
  )
}

BasicTextField.propTypes = {
  control: object.isRequired,
  errors: object.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  fieldSize: number,
  labelSize: number,
  defaultValue: string,
  rules: object,
  autoFocus: bool,
}

BasicTextField.defaultProps = {
  fieldSize: 8,
  labelSize: 4,
  defaultValue: '',
  rules: {},
  autoFocus: false,
}

export default BasicTextField
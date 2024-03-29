import { array, bool, func, number, object, string } from 'prop-types'
import React, { useEffect } from 'react'
import { Col, Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import { Typeahead } from 'react-bootstrap-typeahead'
import { DEFAULT_INCORRECT_INPUT_MESSAGE } from '../../helpers/constants'

const TypeaheadField = ({
  control,
  errors,
  name,
  label,
  data,
  loadData,
  renderFunction,
  multiple,
  labelKey,
  fieldSize,
  labelSize,
  defaultValue,
  rules,
  autoFocus,
}) => {
  useEffect(
    () => {
      loadData()
    }, [])

  const error = error[name]

  return (
    <div>
      <Form.Row
        className={error && 'error' || ''}
        validationstate={error && 'error'}>
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
            as={Typeahead}
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            placeholder={label}

            id={name}
            // isInvalid={isInvalid}
            // isValid={isValid}
            // labelKey={labelKey}
            // onChange={(s) => this.setState({ selected: s })}
            options={data}
            multiple={multiple}
            // renderMenuItemChildren={renderFunction}
          />
        </Col>
      </Form.Row>
      {
        error &&
        <Form.Row>
          <Col sm={{
            span: fieldSize,
            offset: labelSize,
          }}
          style={{
            paddingLeft: '.75em',
            paddingBottom: '.5em',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Form.Text
              muted={true}
              style={{ color: 'red' }}>{error.message || DEFAULT_INCORRECT_INPUT_MESSAGE}</Form.Text>
          </Col>
        </Form.Row>
      }
    </div>
  )
}

TypeaheadField.propTypes = {
  control: object.isRequired,
  errors: object.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  data: array.isRequired,
  loadData: func.isRequired,
  renderFunction: func,
  multiple: bool,
  labelKey: string.isRequired,
  fieldSize: number,
  labelSize: number,
  defaultValue: string,
  rules: object,
  autoFocus: bool,
}

TypeaheadField.defaultProps = {
  renderFunction: {},
  multiple: false,
  labelKey: 'id',
  fieldSize: 8,
  labelSize: 4,
  defaultValue: '',
  rules: {},
  autoFocus: false,
}

export default TypeaheadField

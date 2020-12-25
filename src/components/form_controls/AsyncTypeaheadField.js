import { bool, func, number, object, string, array } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Col, Form } from 'react-bootstrap'
// import { Controller } from 'react-hook-form'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { fetchWrapper } from '../../helpers/api'

const AsyncTypeaheadField = ({
  control,
  errors,
  name,
  label,
  data,
  loadData,
  sourceURI,
  renderFunction,
  multiple,
  fieldSize,
  labelSize,
  defaultValue,
  rules,
  autoFocus,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState([])

  useEffect(
    () => {
      loadData()
    }, [])

  // const handleSearch = async (query) => {
  //   // async () => {
  //   setIsLoading(true)
  //
  //   const data = await fetchWrapper(sourceURI + query)
  //
  //   setOptions(data.map(renderFunction))
  //   setIsLoading(false)
  //   // }
  // }

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
          {/* <Controller */}
          {/*  as={Form.Control} */}
          {/*  name={name} */}
          {/*  control={control} */}
          {/*  rules={rules} */}
          {/*  defaultValue={defaultValue} */}
          {/*  autoFocus={autoFocus} */}
          {/*  placeholder={label}/> */}
          <AsyncTypeahead
            id='async-example'
            isLoading={isLoading}
            labelKey='login'
            minLength={3}
            // onSearch={handleSearch}
            options={data}
            multiple={multiple}
            placeholder='Search for a Github user...'
            renderMenuItemChildren={i => i.displayName}
          />
        </Col>
      </Form.Row>
      {
        (errors[name] && false) &&
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
              style={{ color: 'red' }}>Your input is required</Form.Text>
          </Col>
        </Form.Row>
      }
    </div>
  )
}

AsyncTypeaheadField.propTypes = {
  control: object.isRequired,
  errors: object.isRequired,
  name: string.isRequired,
  label: string.isRequired,
  data: array.isRequired,
  loadData: func.isRequired,
  sourceURI: string.isRequired,
  renderFunction: func.isRequired,
  multiple: bool,
  fieldSize: number,
  labelSize: number,
  defaultValue: string,
  rules: object,
  autoFocus: bool,
}

AsyncTypeaheadField.defaultProps = {
  multiple: false,
  fieldSize: 8,
  labelSize: 4,
  defaultValue: '',
  rules: {},
  autoFocus: false,
}

export default AsyncTypeaheadField

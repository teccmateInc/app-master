import React, { useContext } from 'react'
import { Button, Col, Dropdown, Form, FormControl, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import PoliciesContext from './PoliciesContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '../table/table.scss'

export default function PoliciyCRUD() {
  const { selectedPolicy } = useContext(PoliciesContext)
  // useEffect(() => {
  //   console.log(selectedPolicy);
  // }, [selectedPolicy]);

  const { register, handleSubmit, errors } = useForm() // initialize the hook
  const onSubmit = (data) => {
    console.log(data)
  }

  const DropDown = React.forwardRef(({ id }, ref) => (
    <select
      name={id}
      id={id}
      className="form-control form-control-sm dropdown"
      ref={ref}
    >
      <option value="1" as="option" defaultValue=""></option>
      <option value="2" as="option">
        option 1
      </option>
      <option value="3" as="option">
        option 2
      </option>
      <option value="1" as="option">
        option 3
      </option>
    </select>
  ))

  return (
    <>
      <Col xs={12} className="mt-3">
        <Col
          xs={10}
          className="col-12 px-0 py-2"
          style={{ borderBlockEnd: ' 5px solid #7bc2ff' }}
        >
          <Button variant="primary" className="add-policy p-2">
            <FontAwesomeIcon
              icon={faPlus}
              style={{
                cursor: 'pointer',
              }}
            />
            ADD POLICY
          </Button>{' '}
        </Col>
      </Col>
      <Col xs={12}>
        <Row className="col-12">
          <Form className="col-8 p-0" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xs={6}>
                <Form.Row>
                  <Col xs={6} className="policy-label">
                    <Form.Label htmlFor="carrier" column="sm" lg={12}>
                      Carrier
                    </Form.Label>
                    <Form.Label htmlFor="primary-agent" column="sm" lg={12}>
                      Primary Agent
                    </Form.Label>
                    <Form.Label htmlFor="agent-number" column="sm" lg={12}>
                      Agent Number
                    </Form.Label>
                    <Form.Label htmlFor="comp-plan" column="sm" lg={12}>
                      Comp Plan
                    </Form.Label>
                    <Form.Label htmlFor="product" column="sm" lg={12}>
                      Product
                    </Form.Label>
                    <Form.Label htmlFor="type" column="sm" lg={12}>
                      Type
                    </Form.Label>
                  </Col>
                  <Col xs={6} className="policy-label">
                    <DropDown id="carrier" ref={register} />
                    <Form.Control
                      className="col-12"
                      size="sm"
                      id="primary-agent"
                      name="primary-agent"
                      ref={register}
                    />
                    <Form.Control
                      className="col-12"
                      size="sm"
                      id="agent-number"
                      name="agent-number"
                      ref={register}
                    />
                    <DropDown id="comp-plan" ref={register} />
                    <DropDown id="product" ref={register} />
                    <DropDown id="type" ref={register} />
                  </Col>
                </Form.Row>
              </Col>
              <Col xs={6}>
                <Form.Row>
                  <Col xs={6} className="policy-label">
                    <Form.Label htmlFor="policynumber" column="sm" lg={12}>
                      Policy Number
                    </Form.Label>
                    <Form.Label htmlFor="premium" column="sm" lg={12}>
                      Premium
                    </Form.Label>
                    <Form.Label htmlFor="mode" column="sm" lg={12}>
                      Mode
                    </Form.Label>
                    <Form.Label htmlFor="effectivedate" column="sm" lg={12}>
                      Effective Date
                    </Form.Label>
                    <Form.Label htmlFor="status" column="sm" lg={12}>
                      Status
                    </Form.Label>
                    <Form.Label htmlFor="termdate" column="sm" lg={12}>
                      Term Date
                    </Form.Label>
                  </Col>
                  <Col xs={6} className="policy-label">
                    <Form.Control
                      className="col-12"
                      size="sm"
                      id="policynumber"
                      name="policynumber"
                      ref={register}
                    />
                    <Form.Control
                      className="col-12"
                      size="sm"
                      id="premium"
                      name="premium"
                      ref={register}
                    />
                    <DropDown id="mode" ref={register} />
                    <DropDown id="effectivedate" ref={register} />
                    <DropDown id="status" ref={register} />
                    <DropDown id="termdate" ref={register} />
                  </Col>
                </Form.Row>
              </Col>
              <Col xs={12}>
                <input
                  type="submit"
                  value="Save"
                  className="btn btn-primary"
                  style={{ background: '#5dacf0' }}
                />
              </Col>
            </Row>
          </Form>
          <Col xs={4}>
            <Col xs={12} className="mt-2 p-2 comp-header">
              Comp Plan
            </Col>
            <Col xs={12} className="comp-desc"></Col>
          </Col>
        </Row>
      </Col>
    </>
  )
}

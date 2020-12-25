import { func, object, string } from 'prop-types'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const AddEditModal = ({ title, body, submitModal, closeModal }) => {
  const [show, setShow] = useState(true)
  const [validated, setValidated] = useState(false)

  const onClose = () => {
    setShow(false)

    closeModal()
  }

  const onSubmit = (e) => {
    e.preventDefault()

    submitModal()
  }

  return (
    <Modal show={true} onHide={onClose} backdrop="static">
      <Modal.Header closeButton={true} className="justify-content-center">
        <Modal.Title>{title.toUpperCase()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          inline={true}
          onSubmit={onSubmit}
          noValidate={true}
          validated={validated}
          className="justify-content-center"
        >
          {body}
          <div
            style={{
              marginBottom: '20px',
              marginTop: '30px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="info"
              id="CANCEL"
              type="button"
              onClick={onClose}
              style={{ padding: '6px 40px' }}
            >
              CANCEL
            </Button>
            <Button
              variant="info"
              id="SUBMIT"
              className="active"
              type="submit"
              onClick={onSubmit}
              style={{
                marginLeft: '50px',
                padding: '6px 40px',
              }}
            >
              SUBMIT
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

AddEditModal.propTypes = {
  title: string.isRequired,
  body: object.isRequired,
  submitModal: func.isRequired,
  closeModal: func.isRequired,
}

export default AddEditModal

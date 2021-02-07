import { bool, func, string } from 'prop-types'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'


const DeleteModal = ({
                         title,
                         name,
                         warn,
                         message,
                         submitModal,
                         closeModal,
                     }) => {

    const [show, setShow] = useState(true)

    const onClose = () => {
        setShow(false)

        closeModal()
    }

    const onSubmit = e => {
        e.preventDefault()

        submitModal()
    }

    return (
        <Modal
            show={show}
            onHide={onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title.toUpperCase()} - {name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="modal-text">{message}</h5>

                {!warn &&
                <div>
                    <i className="fa fa-exclamation-triangle"
                       style={{color: 'red', marginRight: '7px'}}/>
                    <span
                        style={{
                            color: '#666666',
                            fontSize: '13px'
                        }}>This action cannot be undone</span></div>}

                <Form
                    inline
                    onSubmit={onSubmit}
                >
                    <div style={{
                        marginBottom: '20px',
                        marginTop: '30px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        {warn &&
                        <Button variant="info" className="active" onClick={onClose}
                                style={{padding: '6px 40px'}}>
                            OK
                        </Button>
                        ||
                        <div>
                            <Button variant="info" type="button" onClick={onClose}
                                    style={{padding: '6px 40px'}}>
                                CANCEL
                            </Button>
                            <Button variant="info" id="CONTINUE" className="active" type="submit"
                                    style={{marginLeft: '50px', padding: '6px 40px'}}
                                    onClick={onSubmit}>
                                CONTINUE
                            </Button>
                        </div>}
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

DeleteModal.propTypes = {
    title: string.isRequired,
    name: string,
    warn: bool,
    message: string.isRequired,
    submitModal: func.isRequired,
    closeModal: func.isRequired,
}

export default DeleteModal

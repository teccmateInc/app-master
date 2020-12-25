import React, { useState } from 'react'
import ModalContext from './ModalContext'

// TODO import individual components from react-bootstrap
// import { Button, Form, Modal } from 'react-bootstrap'
// import Button from 'react-bootstrap/Button'

const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null)

  const closeModal = () => setModalContent(() => null)

  return (
    <ModalContext.Provider value={{
      setModalContent,
      closeModal,
    }}>
      {children}
      {modalContent && (modalContent)
        // (
        //     <Modal
        //         show={true}
        //         onHide={closeModal}
        //     >
        //         <Modal.Header closeButton>
        //             <Modal.Title>{title.toUpperCase()}</Modal.Title>
        //         </Modal.Header>
        //         <Modal.Body>
        //             {modalContent}
        //         </Modal.Body>
        //     </Modal>
        //     )
      }
    </ModalContext.Provider>
  )
}

export default ModalProvider

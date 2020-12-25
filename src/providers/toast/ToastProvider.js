import React, { useState } from "react";
import ToastContext from "./ToastContext.js";

// TODO import individual components from react-bootstrap
// import { Button, Form, Modal } from 'react-bootstrap'
// import Button from 'react-bootstrap/Button'

const ToastProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const closeToast = () => setShow(false);
  return (
    <ToastContext.Provider
      value={{
        setModalContent,
        closeModal,
      }}
    >
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
          minHeight: "200px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">Bootstrap</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>See? Just like this.</Toast.Body>
          </Toast>
          <Toast>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">Bootstrap</strong>
              <small>2 seconds ago</small>
            </Toast.Header>
            <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
          </Toast>
        </div>
      </div>

      {/*{children}*/}
      {/*{modalContent && (modalContent)*/}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

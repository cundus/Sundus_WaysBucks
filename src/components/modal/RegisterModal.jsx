import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const RegisterModal = ({ show, hide, showLogin }) => {
  return (
    <div>
      <Modal show={show} onHide={hide} centered>
        <Form className="p-5">
          <h1 className="color-dominant mb-3">Register</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="form-dominant"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              className="form-dominant"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Control
              type="text"
              placeholder="Full Name"
              className="form-dominant"
              required
            />
          </Form.Group>

          <Button className="button-dominant full-width" type="submit">
            Register
          </Button>
          <p className="text-center mt-3">
            Already have an account ? Click{" "}
            <span className="fw-bold cursor-pointer" onClick={showLogin}>
              Here
            </span>
          </p>
        </Form>
      </Modal>
    </div>
  );
};

export default RegisterModal;

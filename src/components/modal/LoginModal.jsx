import React from "react";
import { Form, Button, Modal } from "react-bootstrap";

const LoginModal = ({ show, hide, showRegister }) => {
  return (
    <div>
      <Modal show={show} onHide={hide} centered>
        <Form className="p-5">
          <h1 className="color-dominant mb-3">Login</h1>
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

          <Button className="button-dominant full-width" type="submit">
            Login
          </Button>
          <p className="text-center mt-3">
            Don't have an account ? Click{" "}
            <span className="fw-bold cursor-pointer" onClick={showRegister}>
              Here
            </span>
          </p>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginModal;

import React, { useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { loginData } from "../../data/fakedata";

const LoginModal = ({ show, hide, showRegister, dispatch }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsError(false);

    const response = loginData.filter((item) => item.email === data.email);
    // setDataUser(response[0]);
    if (
      response.length > 0 &&
      response[0].password === data.password &&
      response[0].email === data.email
    ) {
      // console.log("ini adalah response", response[0]);
      dispatch({
        type: "LOGIN",
        payload: response[0],
      });
      localStorage.setItem("userlogin", response[0].email);
      hide();
      history.push(response[0].isAdmin ? "/dashboard" : "/");
    } else {
      console.log("data Kososng");
      setIsError(true);
    }
    setLoading(false);
  };

  return (
    <div>
      <Modal show={show} onHide={hide} centered>
        <Form className="p-5" onSubmit={handleSubmit}>
          <h1 className="color-dominant mb-3">Login</h1>
          {isError && (
            <Alert variant="danger">Email or Password Don't Match</Alert>
          )}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="form-dominant"
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              className="form-dominant"
              required
              name="password"
              onChange={handleChange}
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

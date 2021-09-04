import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { loginData } from "../../data/fakedata";

const RegisterModal = ({ show, hide, showLogin }) => {
  const [data, setData] = useState({
    id: Math.floor(Math.random() * 100 + 1),
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmail = loginData.filter((item) => item.email === data.email);
    if (checkEmail.length > 0 && checkEmail[0].email === data.email) {
      console.log("Data sudah ada");
      setIsError(true);
      setSuccess(false);
    } else {
      loginData.push(data);
      console.log(loginData);
      setIsError(false);
      setSuccess(true);
      setData({
        id: Math.floor(Math.random() * 100 + 1),
        name: "",
        email: "",
        password: "",
        isAdmin: false,
      });
    }
  };

  return (
    <div>
      <Modal show={show} onHide={hide} centered>
        <Form className="p-5" onSubmit={handleSubmit}>
          <h1 className="color-dominant mb-3">Register</h1>
          {isError && <Alert variant="danger">Email already registered!</Alert>}
          {success && (
            <Alert variant="success">Success Register, You Can Login now</Alert>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="form-dominant"
              required
              name="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              className="form-dominant"
              onChange={handleChange}
              name="password"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Control
              type="text"
              placeholder="Full Name"
              className="form-dominant"
              onChange={handleChange}
              name="name"
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

import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import LoginModal from "../modal/LoginModal";

import Logo from "../../assets/Logo.svg";
import LoginBtn from "../../assets/Login Button.svg";
import RegisterBtn from "../../assets/Button Register.svg";
import RegisterModal from "../modal/RegisterModal";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const showLoginHandle = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const showRegisterHandle = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <div>
      <Navbar collapseOnSelect>
        <Container>
          <Navbar.Brand href="#home">
            <img src={Logo} alt="..." width="70px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="#login">
                <img src={LoginBtn} alt="" onClick={() => setShowLogin(true)} />
              </Nav.Link>
              <Nav.Link href="#register">
                <img
                  src={RegisterBtn}
                  alt=""
                  onClick={() => setShowRegister(true)}
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginModal
        show={showLogin}
        hide={() => setShowLogin(false)}
        showRegister={showRegisterHandle}
      />
      <RegisterModal
        show={showRegister}
        hide={() => setShowRegister(false)}
        showLogin={showLoginHandle}
      />
    </div>
  );
};

export default Header;

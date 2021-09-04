import React, { useContext, useState } from "react";
import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import LoginModal from "../modal/LoginModal";
import { useHistory } from "react-router";

import Logo from "../../assets/Logo.svg";
import LoginBtn from "../../assets/Login Button.svg";
import RegisterBtn from "../../assets/Button Register.svg";
import CartIcon from "../../assets/VectorCart.svg";
import ProfileIcon from "../../assets/ProfileIcon.svg";
import AddProductIcon from "../../assets/AddProduct.svg";
import AddTopppingIcon from "../../assets/addToping.svg";
import LogoutIcon from "../../assets/logout.svg";
import AvatarPlaceholder from "../../assets/profile.png";

import RegisterModal from "../modal/RegisterModal";
import { WBContext } from "../../context/WBContext";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const { state, dispatch } = useContext(WBContext);
  const history = useHistory();

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
          <Navbar.Brand href="#">
            <img
              src={Logo}
              alt="..."
              width="70px"
              onClick={() =>
                history.push(
                  state.isLogin && state.user.isAdmin === true
                    ? "/dashboard"
                    : "/"
                )
              }
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            {!state.isLogin && (
              <Nav>
                <Nav.Link href="#login">
                  <img
                    src={LoginBtn}
                    alt=""
                    onClick={() => setShowLogin(true)}
                  />
                </Nav.Link>
                <Nav.Link href="#register">
                  <img
                    src={RegisterBtn}
                    alt=""
                    onClick={() => setShowRegister(true)}
                  />
                </Nav.Link>
              </Nav>
            )}
            {state.isLogin && (
              <>
                <AfterLogin state={state} dispatch={dispatch} />
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginModal
        show={showLogin}
        hide={() => setShowLogin(false)}
        showRegister={showRegisterHandle}
        dispatch={dispatch}
      />
      <RegisterModal
        show={showRegister}
        hide={() => setShowRegister(false)}
        showLogin={showLoginHandle}
      />
    </div>
  );
};

const AfterLogin = ({ state, dispatch }) => {
  const history = useHistory();

  const handleSignout = (e) => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <>
      <Nav>
        {state.user.isAdmin === false ? (
          <img
            src={CartIcon}
            alt="cart"
            onClick={() => history.push("/cart")}
            className="cursor-pointer me-4"
            width="30px"
          />
        ) : null}
        <Dropdown as={Nav.Item} id="nav-dropdown">
          <Dropdown.Toggle id="dropdown-autoclose-true" as={Nav.Link}>
            <img className="avatar" src={AvatarPlaceholder} alt="..." />
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu">
            {state.user.isAdmin === false ? (
              <NavDropdown.Item onClick={() => history.push("/profile")}>
                <div className="d-flex">
                  <img
                    src={ProfileIcon}
                    alt="..."
                    style={{
                      width: "20px",
                      height: "auto",
                      marginRight: "1em",
                    }}
                  />
                  Profile
                </div>
              </NavDropdown.Item>
            ) : (
              <>
                <NavDropdown.Item onClick={() => history.push("/add-product")}>
                  <div className="d-flex">
                    <img
                      src={AddProductIcon}
                      alt="..."
                      style={{
                        width: "20px",
                        height: "auto",
                        marginRight: "1em",
                      }}
                    />
                    Add Product
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => history.push("/add-product")}>
                  <div className="d-flex">
                    <img
                      src={AddTopppingIcon}
                      alt="..."
                      style={{
                        width: "20px",
                        height: "auto",
                        marginRight: "1em",
                      }}
                    />
                    Add Topping
                  </div>
                </NavDropdown.Item>
              </>
            )}
            <NavDropdown.Divider />

            <NavDropdown.Item onClick={handleSignout} eventKey="4.4">
              <div className="d-flex">
                <img
                  src={LogoutIcon}
                  alt="..."
                  style={{
                    width: "20px",
                    height: "auto",
                    marginRight: "1em",
                  }}
                />
                Logout
              </div>
            </NavDropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </>
  );
};

export default Header;

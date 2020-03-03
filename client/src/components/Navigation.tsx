import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Protected from "./Protected";
import { APP_NAME } from "../constants";
import Logo from "./Logo";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className={"navbar-brand"} to="/">
            <Logo /> {APP_NAME}
          </Link>
        </Navbar.Brand>
        <Protected authOnly>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav>
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/pacients">
                Pacientes
              </Link>
              <Protected>
                <Link className="nav-link" to="/users">
                  Usuarios
                </Link>
              </Protected>
            </Nav>
          </Navbar.Collapse>
        </Protected>
      </Container>
    </Navbar>
  );
};

export default Navigation;

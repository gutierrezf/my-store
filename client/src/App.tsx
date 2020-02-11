import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

import Routes from "./Routes";
import "./App.css";

function App() {
  return (
    <Container className="App p-0" fluid={true}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/">MyStore</Link>
        </Navbar.Brand>
        <Nav className="justify-content-end w-100">
          <Nav.Item>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar>
      <Routes />
    </Container>
  );
}

export default App;

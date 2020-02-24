import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import Routes from "./Routes";
import { useUserContext } from "./context/userContext";
import Login from "./containers/Login";
import { APP_NAME } from "./constants";
import "./App.css";

function renderBody() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/">{APP_NAME}</Link>
        </Navbar.Brand>
      </Navbar>
      <Routes />
    </>
  );
}

function App() {
  const { isLoggedIn } = useUserContext();

  return (
    <Container className="App p-0" fluid={true}>
      {isLoggedIn() ? renderBody() : <Login />}
    </Container>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import Routes from "./Routes";
import { useUserContext } from "./context/userContext";
import "./App.css";
import Login from "./containers/Login";

function renderBody() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/">MyStore</Link>
        </Navbar.Brand>
      </Navbar>
      <Routes />
    </>
  );
}

function App() {
  const { user } = useUserContext();

  console.log({ user });
  return (
    <Container className="App p-0" fluid={true}>
      {user.email ? renderBody() : <Login />}
    </Container>
  );
}

export default App;

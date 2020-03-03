import React from "react";
import { Container } from "react-bootstrap";
import Routes from "./Routes";
import { useUserContext } from "./context/userContext";
import Login from "./containers/Login";
import Navigation from "./components/Navigation";

import "./App.scss";

function App() {
  const { isLoggedIn } = useUserContext();

  return (
    <>
      <Navigation />
      <Container className="App my-5">
        {isLoggedIn() ? <Routes /> : <Login />}
      </Container>
    </>
  );
}

export default App;

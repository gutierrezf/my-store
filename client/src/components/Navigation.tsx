import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { APP_NAME } from "../constants";
import Logo from "./Logo";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link className={"navbar-brand"} to="/">
          <Logo /> {APP_NAME}
        </Link>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Navigation;

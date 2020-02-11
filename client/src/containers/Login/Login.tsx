import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login.css";

interface Props {}

export default function Login(props: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event: any) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username">
          <FormControl
            autoFocus
            onChange={(e: any) => setUsername(e.target.value)}
            placeholder="username"
            type="text"
            value={username}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormControl
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder="password"
            type="password"
            value={password}
          />
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

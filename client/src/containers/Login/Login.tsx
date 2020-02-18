import React from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./Login.css";

type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<FormData>();

  const onSubmit = handleSubmit(({ username, password }) => {
    console.log({ username, password });
  });

  return (
    <div className="Login">
      <form onSubmit={onSubmit}>
        <FormGroup controlId="username">
          <FormControl
            autoFocus
            placeholder="username"
            name="username"
            type="text"
            ref={register}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormControl
            placeholder="password"
            name="password"
            type="password"
            ref={register}
          />
        </FormGroup>
        <Button block disabled={isSubmitting} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

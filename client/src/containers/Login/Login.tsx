import React from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import "./Login.css";

type FormData = {
  username: string;
  password: string;
};

const mutation = gql`
  mutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
      errors {
        path
        message
      }
    }
  }
`;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<FormData>();

  const [login] = useMutation(mutation);

  const onSubmit = handleSubmit(async ({ username, password }) => {
    const result = await login({
      variables: {
        input: {
          username,
          password
        }
      }
    });

    console.log(result);
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

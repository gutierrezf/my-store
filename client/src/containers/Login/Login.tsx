import React from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/react-hooks";
import FadeIn from "react-fade-in";

import { LOGIN_MUTATION, ME_QUERY } from "./graphql";
import { useUserContext } from "../../context/userContext";
import { IMe, IUserLogin } from "../../interfaces";
import Loading from "../../components/Loading";
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

  const { setUser } = useUserContext();
  const [login] = useMutation<IUserLogin>(LOGIN_MUTATION);
  const { loading, data: userData } = useQuery<IMe>(ME_QUERY);

  if (loading) return <Loading />;

  if (userData?.me) {
    setUser(userData.me);
  }

  const onSubmit = handleSubmit(async ({ username, password }) => {
    const { data } = await login({
      variables: {
        email: username,
        password
      }
    });

    if (data?.login?.user) {
      setUser(data.login.user);
    }
  });

  return (
    <div className="Login">
      <form className="pt-3" onSubmit={onSubmit}>
        <h5 className="text-left">Login</h5>
        <FadeIn>
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
        </FadeIn>
      </form>
    </div>
  );
}

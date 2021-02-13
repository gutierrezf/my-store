import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./containers/Home";
import Patients from "./containers/Patients";
import Patient from "./containers/Patient";
import Users from "./containers/Users";
import ProtectedRoute from "./components/ProtectedRoute";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/patients" component={Patients} />
      <ProtectedRoute path="/users" component={Users} />
      <ProtectedRoute path="/patient/:id" component={Patient} />
      <Redirect to={"/"} />
    </Switch>
  );
}

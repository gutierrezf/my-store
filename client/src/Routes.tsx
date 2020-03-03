import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./containers/Home";
import Pacients from "./containers/Pacients";
import Users from "./containers/Users";
import Protected from "./components/Protected";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/pacients" exact component={Pacients} />
      <Protected onDefault={() => <Redirect to={"/"} />}>
        <Route path="/users" exact component={Users} />
      </Protected>
    </Switch>
  );
}

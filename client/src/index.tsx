import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import App from "./App";
import graphqlClient from "./api/graphqlClient";
import { UserProvider } from "./context/userContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "typeface-roboto";
import "./index.css";

const app = (
  <UserProvider>
    <ApolloProvider client={graphqlClient}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </UserProvider>
);

render(app, document.getElementById("root"));

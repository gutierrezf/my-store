import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import App from "./App";
import graphqlClient from "./api/graphqlClient";

import "bootstrap/dist/css/bootstrap.min.css";
import "typeface-roboto";
import "./index.css";

render(
  <ApolloProvider client={graphqlClient}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

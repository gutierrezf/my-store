import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

export const cache = new InMemoryCache();

const port = 4000;

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    credentials: "include",
    uri: `http://localhost:${port}/graphql`
  })
});

export default client;

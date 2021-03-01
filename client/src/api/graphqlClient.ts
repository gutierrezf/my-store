import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

export const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    credentials: "include",
    uri: `https://terapia-fisica-app.herokuapp.com/graphql`
  })
});

export default client;

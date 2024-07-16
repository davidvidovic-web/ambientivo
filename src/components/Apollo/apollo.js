import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:10043/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== "production",
});

if (process.env.NODE_ENV !== "production") {
  window.__APOLLO_CLIENT__ = client;
}

export default client;

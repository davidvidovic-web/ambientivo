import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://admin.ambientivo.com/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== "production",
});

if (process.env.NODE_ENV !== "production") {
  window.__APOLLO_CLIENT__ = client;
}

export default client;

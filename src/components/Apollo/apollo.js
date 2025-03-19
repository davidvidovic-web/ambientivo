import { ApolloClient, InMemoryCache } from "@apollo/client";

// Use environment variable with fallback - Vite syntax
const GRAPHQL_BASE_URL = import.meta.env.VITE_GRAPHQL_BASE_URL || 'https://ambientivo.local/graphql';

const client = new ApolloClient({
  uri: GRAPHQL_BASE_URL,
  cache: new InMemoryCache(),
  connectToDevTools: import.meta.env.MODE !== "production",
});

// Only attach Apollo client to window in non-production
if (import.meta.env.MODE !== "production") {
  // Make sure window exists first (for SSR compatibility)
  if (typeof window !== "undefined") {
    window.__APOLLO_CLIENT__ = client;
  }
}

export default client;


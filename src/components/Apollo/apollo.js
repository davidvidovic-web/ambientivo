import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_BASE_URL,
});

const authLink = setContext((_, { headers }) => {
  // Get the current language from localStorage
  const language = localStorage.getItem('i18nextLng') || 'en';
  
  return {
    headers: {
      ...headers,
      'Accept-Language': language,
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: import.meta.env.MODE !== "production",
});

export default client;


import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ msg, location, path }) => {
      alert(`Graphql err ${msg}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:8080/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return <ApolloProvider client={client}></ApolloProvider>;
}

export default App;

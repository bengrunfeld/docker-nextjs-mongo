import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { gql } from "apollo-boost";
import { App } from "../components";

const Home = ({ host, protocol }) => {
  const uri = `${protocol}://${host}/api/graphql-data`;

  const client = new ApolloClient({
    uri,
  });

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  const host = req?.headers?.host;

  // Use https if we're on prod
  const protocol = host === "localhost:3000" ? "http" : "https";

  return { props: { host, protocol } };
};

export default Home;

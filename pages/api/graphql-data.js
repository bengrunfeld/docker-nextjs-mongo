import { ApolloServer, gql } from "apollo-server-micro";

const data = [
  { id: "0", value: "18.5", timestamp: "1596530814140" },
  { id: "1", value: "22.9", timestamp: "1596617214140" },
  { id: "2", value: "28.4", timestamp: "1596703614140" },
  { id: "3", value: "21.1", timestamp: "1596790014140" },
];

const typeDefs = gql`
  type DataPoint {
    id: ID
    value: String
    timestamp: String
  }

  type Query {
    dataPoints: [DataPoint]
  }

  type Mutation {
    updateDataPoint(id: ID!, value: String!): DataPoint
  }
`;

const resolvers = {
  Query: {
    dataPoints: () => data,
  },

  Mutation: {
    updateDataPoint: (parent, args) => {
      const item = data.reduce((a, b) => {
        if (b.id === args.id) return b;

        return a;
      }, {});

      if (Object.keys(item).length === 0)
        throw "ERROR in Mutation: No matching item in db";
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const handler = server.createHandler({ path: "/api/graphql-data" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

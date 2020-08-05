import { ApolloServer, gql } from "apollo-server-micro";

let data = [
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
    createDataPoint(id: ID!, value: String!, timestamp: String!): DataPoint
    updateDataPoint(id: ID!, value: String!, timestamp: String!): DataPoint
    deleteDataPoint(id: ID!): DataPoint
  }
`;

const resolvers = {
  Query: {
    dataPoints: () => data,
  },

  Mutation: {
    createDataPoint: (parent, args) => {
      data = [...data, args];

      return args;
    },

    updateDataPoint: (parent, args) => {
      const updatedData = data.reduce((a, b) => {
        const newItem = b.id === args.id ? args : b;
        return [...a, newItem];
      }, []);

      data = updatedData;

      return args;
    },

    deleteDataPoint: (parent, args) => {
      const updatedData = data.reduce((a, b) => {
        if (args.id === b.id) return a;

        const newItem = b;
        return [...a, newItem];
      }, []);

      data = updatedData;

      return args;
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

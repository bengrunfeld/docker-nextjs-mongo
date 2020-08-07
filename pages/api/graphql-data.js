import { ApolloServer, gql } from "apollo-server-micro";
import {
  createDbConnection,
  createRecord,
  deleteRecord,
  readAllRecords,
  updateRecord,
} from "../../database";

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
    dataPoints: async () => {
      const { client, db } = await createDbConnection();

      const allRecords = await readAllRecords(db);
      client.close();

      return allRecords;
    },
  },

  Mutation: {
    createDataPoint: async (parent, args) => {
      const { client, db } = await createDbConnection();

      const { id, value, timestamp } = args;

      await createRecord(db, id, value, timestamp);
      client.close();

      return args;
    },

    updateDataPoint: async (parent, args) => {
      const { client, db } = await createDbConnection();

      const { id, value, timestamp } = args;

      await updateRecord(db, id, value, timestamp);
      client.close();

      return args;
    },

    deleteDataPoint: async (parent, args) => {
      const { client, db } = await createDbConnection();

      const { id } = args;

      await deleteRecord(db, id);
      client.close();

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

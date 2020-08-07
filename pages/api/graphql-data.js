import { ApolloServer, gql } from "apollo-server-micro";
import {
  createDbConnection,
  createRecord,
  deleteRecord,
  readAllRecords,
  updateRecord,
} from "../../database";

// let data = [
//   { id: "0", value: "18.5", timestamp: "1596530814140" },
//   { id: "1", value: "22.9", timestamp: "1596617214140" },
//   { id: "2", value: "28.4", timestamp: "1596703614140" },
//   { id: "3", value: "21.1", timestamp: "1596790014140" },
// ];

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

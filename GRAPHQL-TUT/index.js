import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import axios from "axios";

async function startServer() {
  const app = express();

  const typeDefs = `
    type User{
    id: ID!
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String!}
  
  type Todo {
      id: ID!
      title: String!
      completed: Boolean
    }
    type Query {
      getTodos: [Todo]
      getAllUsers: [User]
      getUser(id: ID!): User
    }
  `;

  const resolvers = {
    Query: {
      getTodos: async () =>
        (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
      getAllUsers: async () =>
        (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
      getUser: async(parent,{id})=>{
        (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  // ⚡ Express middleware order matters
  app.use(cors());
  app.use(express.json()); // ✅ MUST be before Apollo
  app.use("/graphql", expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res })
  }));

  app.listen(8000, () => {
    console.log("✅ Server running at PORT:8000");
  });
}

startServer();

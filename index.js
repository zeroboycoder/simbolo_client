const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const connectDB = require("./mongoose")
const typeDefs = require('./apollo/schema')
const resolvers = require("./apollo/resolvers")
const datasource = require("./apollo/datasources");
const app = express()

async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => (datasource)
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

app.use(express.urlencoded({ limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
app.listen({ port: 8000 }, () => {
  connectDB();
  console.log(`🚀 Server ready at http://localhost:8000/graphql`)
});
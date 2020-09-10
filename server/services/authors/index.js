require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
const server = new ApolloServer({ schema });

server.listen(process.env.AUTHORS_SERVICE_PORT).then(({ url }) => {
  console.log(`🚀 Authors service ready at ${url}`);
});

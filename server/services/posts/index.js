require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const redis = require("./redis");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
const server = new ApolloServer({ schema, context: { redis } });

server.listen(process.env.POSTS_SERVICE_PORT).then(({ url }) => {
  console.log(`🚀 Posts service ready at ${url}`);
});

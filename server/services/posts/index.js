require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const Redis = require("ioredis");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
const server = new ApolloServer({ schema, context: { redis } });

server.listen(process.env.POSTS_SERVICE_PORT).then(({ url }) => {
  console.log(`🚀 Posts service ready at ${url}`);
});

const { ApolloServer } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);

const server = new ApolloServer({ schema });

server.listen(4002).then(({ url }) => {
  console.log(`🚀 Posts service ready at ${url}`);
});

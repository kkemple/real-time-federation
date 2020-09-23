require("dotenv").config();
const { ApolloServer, SchemaDirectiveVisitor } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const PublishDirective = require("../shared/PublishDirective");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
const directives = { _publish: PublishDirective };
SchemaDirectiveVisitor.visitSchemaDirectives(schema, directives);

const server = new ApolloServer({ schema });

server.listen(process.env.AUTHORS_SERVICE_PORT).then(({ url }) => {
  console.log(`🚀 Authors service ready at ${url}`);
});

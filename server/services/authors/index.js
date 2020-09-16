require("dotenv").config();
const { ApolloServer, SchemaDirectiveVisitor } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const resolvers = require("./resolvers");
const StreamDirective = require("../shared/StreamDirective");
const typeDefs = require("./typeDefs");

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
const directives = { _stream: StreamDirective };
SchemaDirectiveVisitor.visitSchemaDirectives(schema, directives);

const server = new ApolloServer({ schema });

server.listen(process.env.AUTHORS_SERVICE_PORT).then(({ url }) => {
  console.log(`🚀 Authors service ready at ${url}`);
});

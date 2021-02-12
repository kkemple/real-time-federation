require("dotenv").config();

const { ApolloServer, SchemaDirectiveVisitor } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const Pusher = require("pusher");

const PublishDirective = require("../shared/PublishDirective");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
const directives = { _publish: PublishDirective };
SchemaDirectiveVisitor.visitSchemaDirectives(schema, directives);

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

const server = new ApolloServer({ schema, context: { pusher } });

server.listen(process.env.POSTS_SERVICE_PORT).then(({ url }) => {
  console.log(`🚀 Posts service ready at ${url}`);
});

require("dotenv").config();
const { ApolloServer, SchemaDirectiveVisitor } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

let posts = require("./data");
const redis = require("../../redis");
const resolvers = require("./resolvers");
const StreamDirective = require("../shared/StreamDirective");
const subscribeStream = require("../../redis/utils/streamSubscription");
const typeDefs = require("./typeDefs");

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
const directives = { _stream: StreamDirective };
SchemaDirectiveVisitor.visitSchemaDirectives(schema, directives);

const server = new ApolloServer({ schema, context: { redis } });

server.listen(process.env.POSTS_SERVICE_PORT).then(({ url }) => {
  console.log(`🚀 Posts service ready at ${url}`);
});

/* Messages from Authors Service */

subscribeStream(redis, "graphql_stream", results => {
  results.forEach(({ data: { event, id } }) => {
    if (event === "AUTHOR_REMOVED") {
      const filteredPosts = posts.filter(
        post => post.authorID !== parseInt(id)
      );
      posts = filteredPosts;
    }
  });
});

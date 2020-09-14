const Redis = require("ioredis");

require("../../lib/redis/streamTransformers");
const { subscribeStream } = require("../../lib/redis/streamSubscription");
let posts = require("./data");

const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);

// Delete author's posts when an `AUTHOR_REMOVED` event is received
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

module.exports = redis;

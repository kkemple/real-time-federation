require("dotenv").config();
const { ApolloGateway } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server");
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);
const Redis = require("ioredis");

require("./lib/redis/streamTransformers");
const { subscribeStream } = require("./lib/redis/streamSubscription");

/* Socket.io */

httpServer.listen(5000);

/* Redis */

const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);

subscribeStream(redis, "graphql_stream", results => {
  results.forEach(({ id: redisID, data: { event, id } }) => {
    io.emit(event, { id, timestamp: redisID.split("-")[0] });
  });
});

/* Apollo */

const gateway = new ApolloGateway({
  serviceList: [
    { name: "authors", url: process.env.AUTHORS_SERVICE_URL },
    { name: "posts", url: process.env.POSTS_SERVICE_URL }
  ]
});
const server = new ApolloServer({ gateway, subscriptions: false });

server.listen(process.env.GATEWAY_PORT).then(({ url }) => {
  console.log(`🚀 Gateway API running at ${url}`);
});

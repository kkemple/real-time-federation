require("dotenv").config();

const http = require("http");

const { ApolloGateway } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server");
const socketIo = require("socket.io");

require("./redis/utils/streamTransformers");
const redis = require("./redis");
const subscribeStream = require("./redis/utils/streamSubscription");

/* Socket.io */

const httpServer = http.createServer();
const io = socketIo(httpServer);
httpServer.listen(process.env.SOCKET_IO_PORT);

subscribeStream(redis, "graphql_stream", results => {
  results.forEach(({ data, id }) => {
    const dataCopy = JSON.parse(JSON.stringify(data));
    delete dataCopy.event;
    io.emit(data.event, { ...dataCopy, timestamp: id.split("-")[0] });
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

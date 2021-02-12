require("dotenv").config();

const { ApolloGateway } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server");

/* Apollo */

const gateway = new ApolloGateway({
  serviceList: [
    { name: "authors", url: process.env.AUTHORS_SERVICE_URL },
    { name: "posts", url: process.env.POSTS_SERVICE_URL },
  ],
});
const server = new ApolloServer({ gateway, subscriptions: false });

server.listen(process.env.GATEWAY_PORT).then(({ url }) => {
  console.log(`🚀 Gateway API running at ${url}`);
});

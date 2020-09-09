const { ApolloGateway } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "authors", url: "http://localhost:4001" },
    { name: "posts", url: "http://localhost:4002" }
  ]
});

const server = new ApolloServer({ gateway, subscriptions: false });

server.listen().then(({ url }) => {
  console.log(`🚀 Gateway API running at ${url}`);
});

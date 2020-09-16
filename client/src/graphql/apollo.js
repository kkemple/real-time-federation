import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import io from "socket.io-client";

import LiveLink from "../utils/LiveLink";
import operationPolicies from "./operationPolicies";

// Create event subscription link
const socket = io(process.env.REACT_APP_SOCKETIO_URL, {
  transports: ["websocket", "polling"]
});
const liveLink = new LiveLink(socket, operationPolicies);

// Create terminating HTTP link
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL
});

const client = new ApolloClient({
  link: liveLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;

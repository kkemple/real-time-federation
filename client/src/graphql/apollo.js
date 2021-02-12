import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import Pusher from "pusher-js";

import LiveLink from "../utils/LiveLink";
import operationPolicies from "./operationPolicies";

const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
});
const channel = pusher.subscribe(process.env.REACT_APP_PUSHER_CHANNEL);

const liveLink = new LiveLink(channel, operationPolicies);

// Create terminating HTTP link
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

const client = new ApolloClient({
  link: liveLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

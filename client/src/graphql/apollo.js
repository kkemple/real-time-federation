import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Observable
} from "@apollo/client";
import { getMainDefinition, hasDirectives } from "@apollo/client/utilities";

// Create terminating HTTP link
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL
});

class SocketIoLink extends ApolloLink {
  request(operation, forward) {
    // console.log(operation);
    const { query } = operation;
    const isSubscribedQuery = hasDirectives(["subscribe"], query);

    if (!isSubscribedQuery) {
      return forward(operation);
    }

    const observable = forward(operation);
    const mainDefinition = getMainDefinition(query);
    const subscribeDirective = mainDefinition.directives.find(
      directive => directive.name.value === "subscribe"
    );
    const {
      value: { value: subscribeToEventsValue }
    } = subscribeDirective.arguments.find(arg => arg.name.value === "events");
    const events = subscribeToEventsValue.split(" ");

    console.log(events);

    return new Observable(observer => {
      const subscription = observable.subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer)
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }
}

const socketIoLink = new SocketIoLink();

const client = new ApolloClient({
  link: socketIoLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;

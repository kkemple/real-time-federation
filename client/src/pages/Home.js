import { useQuery } from "@apollo/client";
import moment from "moment";
import React, { useEffect } from "react";

import { GetPost, GetPosts } from "../graphql/queries";
import useSocket from "../hooks/useSocket";

const socketUrl = process.env.REACT_APP_SOCKETIO_URL;

function Home() {
  const { client, data, loading } = useQuery(GetPosts);
  const { subscribeToEvent } = useSocket(socketUrl);

  useEffect(() => {
    subscribeToEvent("postAdded", (err, postEvent) => {
      if (err) {
        return;
      }

      console.log("New postAdded event:", postEvent);

      if (postEvent) {
        client
          .query({ query: GetPost, variables: { id: postEvent.id } })
          .then(result => {
            const currentPosts = client.readQuery({ query: GetPosts });
            client.writeQuery({
              query: GetPosts,
              data: { posts: [...currentPosts.posts, result.data.post] }
            });
          });
      }
    });
  }, [client, subscribeToEvent]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return [...data.posts]
    .sort((a, b) =>
      Date.parse(b.publishedAt) > Date.parse(a.publishedAt) ? 1 : -1
    )
    .map(({ author, content, id, title, publishedAt }) => (
      <article key={id}>
        <h1>{title}</h1>
        <p>Post ID: {id}</p>
        <p>By {author.name}</p>
        <p>{moment(publishedAt).format("h:mm A MMM D, YYYY")}</p>
        <p>{content}</p>
      </article>
    ));
}

export default Home;

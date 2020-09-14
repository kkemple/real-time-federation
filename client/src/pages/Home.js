import { Link } from "react-router-dom";
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
    // Update feed when post added
    subscribeToEvent("POST_ADDED", (err, postEvent) => {
      if (err) {
        return;
      }

      console.log("New POST_ADDED event:", postEvent);

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

    // Update feed when author and their posts are removed
    subscribeToEvent("AUTHOR_REMOVED", (err, authorEvent) => {
      if (err) {
        return;
      }

      console.log("New AUTHOR_REMOVED event:", authorEvent);

      if (authorEvent) {
        const { posts: currentPosts } = client.readQuery({ query: GetPosts });
        const updatedPosts = [...currentPosts].filter(
          post => post.author.id !== authorEvent.id
        );
        client.writeQuery({
          query: GetPosts,
          data: { posts: updatedPosts }
        });
      }
    });
  }, [client, subscribeToEvent]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav>
        <p>
          <Link to="/post/add">Add a Post</Link> |{" "}
          <Link to="/author/remove">Remove Author</Link>
        </p>
      </nav>
      {data?.posts?.length ? (
        [...data.posts]
          .filter(post => post !== null)
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
          ))
      ) : (
        <p>No posts available!</p>
      )}
    </div>
  );
}

export default Home;

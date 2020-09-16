import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";

import { RemoveAuthor as RemoveAuthorMutation } from "../graphql/mutations";

function RemoveAuthor() {
  const id = 1;
  const [completedMessage, setCompletedMessage] = useState("");

  const [removeAuthor] = useMutation(RemoveAuthorMutation, {
    onCompleted() {
      setCompletedMessage("The author named Alice was deleted");
    }
  });

  return (
    <div>
      <nav>
        <p>
          <Link to="/">&larr; Back Home</Link>
        </p>
      </nav>
      <h1>Remove Author & Posts</h1>
      <p>
        Clicking this button will delete the Alice author and all of her posts:
      </p>
      <button
        onClick={event => {
          event.preventDefault();
          setCompletedMessage("");
          removeAuthor({ variables: { id } });
        }}
      >
        Delete Author & Posts
      </button>
      {completedMessage && (
        <p>
          {completedMessage}. <Link to="/">View posts &rarr;</Link>
        </p>
      )}
    </div>
  );
}

export default RemoveAuthor;

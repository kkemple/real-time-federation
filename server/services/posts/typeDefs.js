const { gql } = require("apollo-server");

module.exports = gql`
  enum StreamEvent {
    AUTHOR_REMOVED
    POST_ADDED
  }

  directive @_stream(payload: String, event: StreamEvent!) on FIELD_DEFINITION

  directive @_live(events: [StreamEvent!]!) on QUERY

  type Post {
    id: ID!
    author: Author!
    content: String!
    publishedAt: String!
    title: String!
  }

  extend type Author @key(fields: "id") {
    id: ID! @external
    posts: [Post]
  }

  extend type Query {
    post(id: ID!): Post
    posts: [Post]
  }

  extend type Mutation {
    addPost(authorID: ID!, content: String, title: String): Post
    @_stream(
      payload: "authorID content id publishedAt title"
      event: POST_ADDED
    )
  }
`;

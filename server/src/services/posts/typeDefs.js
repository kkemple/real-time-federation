const { gql } = require("apollo-server");

module.exports = gql`
  enum PublishableEvent {
    AUTHOR_REMOVED
    POST_ADDED
  }

  directive @_publish(
    payload: String
    event: PublishableEvent!
  ) on FIELD_DEFINITION

  directive @_live(events: [PublishableEvent!]!) on QUERY

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
    @_publish(
      payload: "authorID content id publishedAt title"
      event: POST_ADDED
    )
  }
`;

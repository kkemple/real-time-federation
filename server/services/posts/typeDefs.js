const { gql } = require("apollo-server");

module.exports = gql`
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
    getPost(id: ID!): Post
    getPosts: [Post]
  }

  extend type Mutation {
    addPost(authorId: ID!, content: String, title: String): Post
  }
`;

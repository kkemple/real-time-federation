const { gql } = require("apollo-server");

module.exports = gql`
  enum StreamEvent {
    AUTHOR_REMOVED
    POST_ADDED
  }

  directive @_stream(payload: String, event: StreamEvent!) on FIELD_DEFINITION

  directive @_live(events: [StreamEvent!]!) on QUERY

  type Author @key(fields: "id") {
    id: ID!
    name: String!
  }

  extend type Query {
    author(id: ID!): Author
    authors: [Author]
  }

  extend type Mutation {
    removeAuthor(id: ID!): ID @_stream(payload: "id", event: AUTHOR_REMOVED)
  }
`;

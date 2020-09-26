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

  type Author @key(fields: "id") {
    id: ID!
    name: String!
  }

  extend type Query {
    author(id: ID!): Author
    authors: [Author]
  }

  extend type Mutation {
    removeAuthor(id: ID!): ID @_publish(payload: "id", event: AUTHOR_REMOVED)
  }
`;

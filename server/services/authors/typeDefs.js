const { gql } = require("apollo-server");

module.exports = gql`
  directive @subscribe(events: String) on QUERY

  type Author @key(fields: "id") {
    id: ID!
    name: String!
  }

  extend type Query {
    author(id: ID!): Author
    authors: [Author]
  }

  extend type Mutation {
    removeAuthor(id: ID!): ID
  }
`;

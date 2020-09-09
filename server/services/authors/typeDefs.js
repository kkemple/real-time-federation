const { gql } = require("apollo-server");

module.exports = gql`
  type Author @key(fields: "id") {
    id: ID!
    name: String!
  }

  extend type Query {
    getAuthor(id: ID!): Author
    getAuthors: [Author]
  }
`;

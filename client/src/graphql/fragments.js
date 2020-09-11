import { gql } from "@apollo/client";

export const PostFields = gql`
  fragment PostFields on Post {
    author {
      name
    }
    content
    id
    publishedAt
    title
  }
`;

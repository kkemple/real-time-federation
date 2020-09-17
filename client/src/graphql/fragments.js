import { gql } from "@apollo/client";

export const NewPostFields = gql`
  fragment NewPostFields on Post {
    author {
      id
    }
    content
    id
    publishedAt
    title
  }
`;

export const PostFields = gql`
  fragment PostFields on Post {
    author {
      id
      name
    }
    content
    id
    publishedAt
    title
  }
`;

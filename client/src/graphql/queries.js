import { gql } from "@apollo/client";

import { PostFields } from "./fragments";

export const GetPost = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      ...PostFields
    }
  }
  ${PostFields}
`;

export const GetPosts = gql`
  query GetPosts {
    posts {
      ...PostFields
    }
  }
  ${PostFields}
`;

import { gql } from "@apollo/client";

export const AddPost = gql`
  mutation AddPost($authorID: ID!, $content: String!, $title: String!) {
    addPost(authorID: $authorID, content: $content, title: $title) {
      id
      title
      publishedAt
      author {
        name
      }
      content
    }
  }
`;

export const RemoveAuthor = gql`
  mutation RemoveAuthor($id: ID!) {
    removeAuthor(id: $id)
  }
`;

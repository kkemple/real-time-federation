import { NewPostFields } from "./fragments";

const operationPolicies = {
  GetPosts: {
    events: {
      POST_ADDED(cache, data) {
        const { authorID, content, id, publishedAt, title } = data;
        const newPost = {
          __typename: "Post",
          author: { __typename: "Author", id: authorID },
          content,
          id,
          publishedAt,
          title
        };

        // Update posts query
        cache.modify({
          fields: {
            posts(existingPostRefs = [], { readField }) {
              const newPostRef = cache.writeFragment({
                data: newPost,
                fragment: NewPostFields
              });

              // Safety check
              if (existingPostRefs.some(ref => readField("id", ref) === id)) {
                return existingPostRefs;
              }

              return [...existingPostRefs, newPostRef];
            }
          }
        });
      },
      AUTHOR_REMOVED(cache, data) {
        // Update posts query
        cache.modify({
          fields: {
            posts(existingPostRefs, { readField }) {
              return existingPostRefs.filter(postRef => {
                const authorRef = readField("author", postRef);
                return `Author:${data.id}` !== authorRef.__ref;
              });
            }
          }
        });

        // Clean up unreachable Author and Post cache items
        cache.gc();
      }
    }
  }
};

export default operationPolicies;

const posts = require("./data");

module.exports = {
  Author: {
    posts(author, args, context, info) {
      return posts.filter(post => post.authorId === author.id);
    }
  },

  Post: {
    author(post) {
      return { __typename: "Author", id: post.authorID };
    }
  },

  Query: {
    post(root, { id }, context, info) {
      return posts.find(post => post.id === parseInt(id));
    },
    posts(root, args, context, info) {
      return posts;
    }
  },

  Mutation: {
    addPost(root, { authorID, content, title }, { redis }, info) {
      const postID = posts.length + 1;
      const post = {
        authorID,
        content,
        title,
        id: postID,
        publishedAt: new Date().toISOString()
      };

      posts.push(post);
      redis.xadd("graphql_stream", "*", "event", "POST_ADDED", "id", postID);

      return post;
    }
  }
};

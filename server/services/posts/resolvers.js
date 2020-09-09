const posts = require("./data");

module.exports = {
  Author: {
    posts(author, args, context, info) {
      return posts.filter(post => post.authorId === author.id);
    }
  },

  Post: {
    author(post) {
      return { __typename: "Author", id: post.authorId };
    }
  },

  Query: {
    getPost(root, { id }, context, info) {
      return posts.find(post => post.id === id);
    },
    getPosts(root, args, context, info) {
      return posts;
    }
  },

  Mutation: {
    addPost(root, { authorId, content, title }, context, info) {
      const post = {
        authorId,
        content,
        title,
        id: posts.length + 1,
        publishedAt: new Date().toISOString()
      };
      posts.push(post);

      return post;
    }
  }
};

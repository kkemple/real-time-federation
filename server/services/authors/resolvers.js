const authors = require("./data");

module.exports = {
  Author: {
    __resolveReference(reference, context, info) {
      return authors.find(author => author.id === reference.id);
    }
  },

  Query: {
    getAuthor(parent, { id }, context, info) {
      return authors.find(author => author.id === id);
    },
    getAuthors(parent, args, context, info) {
      return authors;
    }
  }
};

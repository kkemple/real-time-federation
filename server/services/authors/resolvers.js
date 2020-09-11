const authors = require("./data");

module.exports = {
  Author: {
    __resolveReference(reference, context, info) {
      return authors.find(author => author.id === parseInt(reference.id));
    }
  },

  Query: {
    author(parent, { id }, context, info) {
      return authors.find(author => author.id === parseInt(id));
    },
    authors(parent, args, context, info) {
      return authors;
    }
  }
};

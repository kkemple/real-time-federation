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
  },

  Mutation: {
    removeAuthor(parent, { id }, context, info) {
      const authorID = parseInt(id);
      const authorIndex = authors.findIndex(author => author.id === authorID);

      if (authorIndex === -1) {
        return null;
      }

      authors.splice(authorIndex, 1);
      return authorID;
    }
  }
};

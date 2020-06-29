import Book from '../../../models/Book';
import { BOOKS_CHANGED } from './channels';

export default {
  Query: {
    books: () => Book.find(),
    book: (_, { id }) => Book.findById(id),
  },
  Mutation: {
    createBook: async (_, { data }, { pubsub }) => {
      const book = await Book.create(data);

      const books = await Book.find();

      pubsub.publish(BOOKS_CHANGED, {
        books: books,
      });

      return book;
    },
    updateBook: async (_, { id, data }, { pubsub }) => {
      await Book.findByIdAndUpdate(id, data, { new: true });

      const books = await Book.find();

      pubsub.publish(BOOKS_CHANGED, {
        books: books,
      });

      return books;
    },
    deleteBook: async (_, { id }, { pubsub }) => {
      const deleted = !!(await Book.findByIdAndDelete(id));

      const books = await Book.find();

      pubsub.publish(BOOKS_CHANGED, {
        books: books,
      });

      return deleted;
    },
  },
  Subscription: {
    books: {
      subscribe: (obj, args, { pubsub }) => pubsub.asyncIterator(BOOKS_CHANGED),
    },
  },
};

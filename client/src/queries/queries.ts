import { gql } from 'apollo-boost';

const REMOVE_BOOK = gql`
  mutation RemoveBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

const ADD_BOOK = gql`
  mutation CreateBook($title: String!, $description: String!) {
    createBook(data: { title: $title, description: $description }) {
      _id
    }
  }
`;

export { REMOVE_BOOK, ADD_BOOK };

import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_BOOK, REMOVE_BOOK } from '../../queries/queries';

import './styles.scss';

interface Book {
  _id: string;
  title: string;
  description: string;
}

interface BookListProps {
  data: {
    books: Book[];
  };
}

const BookList: React.FC<BookListProps> = ({ data }) => {
  const [bookItems, setBookItems] = useState<any>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [removeBook] = useMutation(REMOVE_BOOK);
  const [addBook] = useMutation(ADD_BOOK);

  useEffect(() => {
    setBookItems(data);
  }, [data]);

  const clearFields = () => {
    setTitle('');
    setDescription('');
  };

  const handleAddBook = () => {
    addBook({ variables: { title, description } });
    clearFields();
  };

  return (
    <div className='container'>
      <div className='register-container'>
        <div className='register-container__inputs'>
          <label htmlFor='book-title'>Title</label>
          <input
            id='book-title'
            type='text'
            value={title}
            onChange={event => setTitle(event.currentTarget.value)}
          ></input>
          <label htmlFor='book-description'>Description</label>
          <input
            id='book-description'
            type='text'
            value={description}
            onChange={event => setDescription(event.currentTarget.value)}
          ></input>
        </div>
        <button className='add-container__add-button' onClick={() => handleAddBook()}>
          Add
        </button>
      </div>
      <ul className='book-list'>
        {bookItems &&
          bookItems.map((book: Book) => (
            <li key={book._id} className='book-list__item'>
              {book.title}
              <button
                className='book-list__button'
                onClick={() => removeBook({ variables: { id: book._id } })}
              >
                Remove
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BookList;

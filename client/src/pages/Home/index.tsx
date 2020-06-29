import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Subscription } from 'react-apollo';

import BookList from '../../components/BookList';

const EXCHANGE_BOOKS = gql`
  {
    books {
      _id
      title
    }
  }
`;

const subscription = gql`
  subscription {
    books {
      _id
      title
    }
  }
`;

const Home: React.FC = () => {
  const { loading, data } = useQuery(EXCHANGE_BOOKS);

  return (
    <Subscription subscription={subscription}>
      {(subData: any) => {
        if (loading) {
          return <h1>Loading...</h1>;
        } else {
          return <BookList data={subData.data ? subData.data.books : data.books} />;
        }
      }}
    </Subscription>
  );
};

export default Home;

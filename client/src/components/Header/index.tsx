import React from 'react';

import './styles.scss';

const header: React.FC = () => {
  return (
    <div className='header'>
      <div className='header__container'>
        <div className='header__brand'>
          <span>Book List</span>
        </div>
      </div>
    </div>
  );
};

export default header;

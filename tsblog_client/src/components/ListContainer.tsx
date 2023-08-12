// ListContainer.tsx

import React from 'react';
import { Item } from './Item';

interface ListContainerProps {
  list: Item[];
}

const ListContainer: React.FC<ListContainerProps> = ({ list }) => {
  const handleItemClick = (index: number) => {
    // Your logic for handling the item click here, e.g., showing details of the item
    console.log('Item clicked:', list[index]);
  };

  return (
    <div>
      <h1>List Items</h1>
      <ul>
        {list.map((item, index) => (
          <li key={item.id} onClick={() => handleItemClick(index)}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListContainer;

'use client';
import React, { useState } from 'react';

interface ItemProps {
    itemTitle: string;
    subItem?: string;
}

const ListItem: React.FC<ItemProps> = ({ itemTitle, subItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div>
        <button onClick={toggleOpen} style={{ cursor: 'pointer' }}>
          {itemTitle}
        </button>
        {isOpen && <div>{subItem}</div>}
      </div>
    );
};

export default ListItem;

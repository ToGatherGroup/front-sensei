'use client';
import React, { useState } from 'react';
import Button from '../button';

interface ItemProps {
    itemTitle: string;
    subItem?: string | string[];
}

const ListItem: React.FC<ItemProps> = ({ itemTitle, subItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <>
        <button onClick={subItem? toggleOpen : () => {}} className="bg-auto bg-white flex-grow" style={{ cursor: 'pointer' }}>
          {itemTitle}
        </button>
        {isOpen && (
                <div className='flex flex-col' >
                    {Array.isArray(subItem)
                        ? subItem.map((item, index) => (
                              <button className="bg-auto bg-gray-50" key={index}>{item}</button>
                          ))
                        : <button>{subItem}</button>}
                </div>
            )}
      </>
    );
};

export default ListItem;


// TIPS:
// Dá pra trabalhar com visibilidade do tailwind para renderizar o accordion https://v2.tailwindcss.com/docs/visibility
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

    //const containerClass = isOpen ? "max-h-96" : "max-h-0"; // Ajuste os valores de max-height conforme necessário
    const opacityClass = isOpen ? "opacity-100" : "opacity-0";

    return (
        <>
            <button onClick={subItem ? toggleOpen : () => {}} className="bg-auto bg-white flex-grow py-3 px-2 text-left transition duration-300 ease-in-out" style={{ cursor: 'pointer' }}>
              {itemTitle}
            </button>
            <div className={`flex flex-col transition-max-height duration-200 ease-in-out align-middle transition-opacity -mt-2 duration-500 ease-in-out ${opacityClass}`}>
                {isOpen && Array.isArray(subItem)
                    ? subItem.map((item, index) => (
                          <button className="bg-auto bg-gray-200 py-3 px-2 text-left border-b-2 border-black" key={index}>{item}</button>
                      ))
                    : isOpen && <button>{subItem}</button>}
            </div>
      </>
    );
};

export default ListItem;


// TIPS:
// Dá pra trabalhar com visibilidade do tailwind para renderizar o accordion https://v2.tailwindcss.com/docs/visibility
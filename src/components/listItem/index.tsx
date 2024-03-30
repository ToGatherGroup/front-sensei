'use client';
import React, { useState } from 'react';

/**
 * A list item component that can toggle the visibility of its sub items.
 * 
 * @param {ItemProps} props - The props for the component.
 * @param {string} props.itemTitle - The title of the item.
 * @param {string|string[]} [props.subItem] - Optional sub items for the list item.
 * @returns {React.ReactElement} The list item component.
 */
interface ItemProps {
    itemTitle: string;
    subItem?: string | string[];
}

const ListItem: React.FC<ItemProps> = ({ itemTitle, subItem }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const opacityClass = isOpen ? "opacity-100" : "opacity-0";

    const baseClasses = "py-3 px-2 text-left transition duration-300 ease-in-out";
    const variantClasses = {
        subItem: "bg-gray-200 border-b-2 border-black",
      };

    return (
        <>
            <button onClick={subItem ? toggleOpen : () => {}} className={`bg-auto bg-white flex-grow ${baseClasses}`} style={{ cursor: 'pointer' }}>
              {itemTitle}
            </button>
            <div className={`transition-max-height align-middle transition-opacity -mt-2 flex flex-col duration-300 ease-in-out ${opacityClass}`}>
                {isOpen && Array.isArray(subItem)
                    ? subItem.map((item, index) => (
                          <button className={`${baseClasses} ${variantClasses.subItem}`} key={index}>{item}</button>
                      ))
                    : isOpen && <button className={`${baseClasses} ${variantClasses.subItem}`}>{subItem}</button>}
            </div>
        </>
    );
};

export default ListItem;

// TODO:
// Router push to the selected item
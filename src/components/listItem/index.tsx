'use client'
import React, { useState } from 'react';
import { ListItemProps } from '@/types/Assessment';
import Link from 'next/link';


// Se bem que no ListItem posso passar a info (header) pra pegar lá no avaliação page, faz sentido?
const ListItem = ({ id, itemTitle, subItem }: ListItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const href = `avaliacao/${encodeURIComponent(id)}`;

    const handleItemClick = () => {
        if (subItem) {
            setIsOpen(!isOpen);
        }
    };

    const opacityClass = isOpen ? "opacity-100" : "opacity-0";
    const baseClasses = "py-3 px-2 text-left transition duration-300 ease-in-out";
    const variantClasses = "bg-gray-200 border-b-2 border-black";

    // Renderiza o botão, opcionalmente dentro de um <Link> se não houver subItem
    const renderItemButton = (renderClass: boolean) => (
        <button onClick={handleItemClick} className={renderClass ? `bg-auto bg-white flex-grow ${baseClasses}` : ""} style={{ cursor: 'pointer' }}>
            {itemTitle}
        </button>
    );

    return (
      <>
              {subItem ? (
                  // Se houver subItem, renderiza o botão diretamente com classeName
                  renderItemButton(true)
              ) : (
                  // Se não houver subItem, envolve o botão com Link
                  <Link href={href} className={`bg-auto bg-white flex-grow ${baseClasses}`}>{renderItemButton(false)}</Link>
              )}
          <div className={`transition-max-height align-middle transition-opacity -mt-2 flex flex-col duration-300 ease-in-out ${opacityClass}`}>
              {isOpen && Array.isArray(subItem) && subItem.map((item, index) => (
                  <Link className={`${baseClasses} ${variantClasses}`} href={`/subItemPage/${encodeURIComponent(item)}`} key={index}>
                          {item}
                  </Link>
              ))}
          </div>
      </>
  );
};

export default ListItem;

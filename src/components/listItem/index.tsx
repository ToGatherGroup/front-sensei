'use client'
import React, { useState } from 'react';
import { ListItemProps } from '@/types/Assessment';
import Link from 'next/link';

const ListMenuItem = ({ id, key, itemTitle, subItem, isIMC }: ListItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const href = `avaliacao/${encodeURIComponent(id)}`;
    const handleItemClick = () => {
        if (subItem) {
            setIsOpen(!isOpen);
        }
    };

    const opacityClass = isOpen ? "opacity-100" : "opacity-0";
    const baseClasses = "py-3 px-2 text-left transition duration-300 ease-in-out ";
    const variantClasses = "bg-gray-200 border-b-2 border-black";

    // Renderiza o botão, opcionalmente dentro de um <Link> se não houver subItem
    const renderItemButton = (renderClass: boolean) => (
        <button onClick={handleItemClick} className={renderClass ? `bg-auto bg-white  ${baseClasses}` : ""} style={{ cursor: 'pointer' }}>
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
                  <Link href={href} className={`bg-auto bg-white  ${baseClasses}`} >{renderItemButton(false)}</Link>
              )}
          <div className={`transition-max-height align-middle transition-opacity -mt-2 flex flex-col duration-300 ease-in-out ${opacityClass}`}>
              {isOpen && Array.isArray(subItem) && subItem.map((subItemName, index) => ( // TODO: Validar assessment ao invés de subItem
                  <Link className={`${baseClasses} ${variantClasses}`} href={`${href + "-" +  encodeURIComponent(index)}`} key={index}>
                          {subItemName}
                  </Link>
              ))}
          </div>
      </>
  );
};

export default ListMenuItem;

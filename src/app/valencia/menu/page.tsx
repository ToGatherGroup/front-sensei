'use client'
import React from 'react'
import ListMenuItem from '../../../components/listItem/index'
import { ListItemProps } from '@/types/Assessment'
import { AVALIACOES_FISICAS, INDICES_FISICOS } from '@/consts/const';
// import { AVALIACOES_FISICAS, INDICES_FISICOS } from '@/consts/const';


// const assesmentArray = AVALIACOES_FISICAS
// const indiceArray= INDICES_FISICOS

const assesmentArray = AVALIACOES_FISICAS
const indiceArray = INDICES_FISICOS

const MenuAvaliacaoPage: React.FC<any> = () => {

    const headerClass = "text-white font-bold"
    const baseClasses = "flex flex-1 flex-col gap-y-2 justify-center fadeIn";

    return (
        <div className={`${baseClasses} p-8 max-w-screen-sm`}>
            <ul className={`${baseClasses} p-1`}>
                <h1 className={`${headerClass}`}>Valências Físicas</h1>
                    {assesmentArray.map(item => {
                        return (
                                <ListMenuItem id={item.key} key={item.key} itemTitle={item.itemTitle} subItem={(item.subItems ? item.subItems : undefined)} isIMC={false}/> //TODO: Refatorar para validar assessment ao invés de subItem
                        );
                    })}
            </ul>
            <ul className={`${baseClasses} p-1`}>
                <h1 className={`${headerClass}`}>Índices</h1>
                    {indiceArray.map(item => {
                        console.log('Item: ')
                        console.log(item)
                        return (
                            <ListMenuItem key={item.key} itemTitle={item.itemTitle} subItem={(item.subItem ? item.subItem : undefined)} id={Number(item.key)} isIMC={true}/> //TODO: Refatorar para validar assessment ao invés de subItem
                        );
                    })}
            </ul>
            </div>
    )
}

export default MenuAvaliacaoPage
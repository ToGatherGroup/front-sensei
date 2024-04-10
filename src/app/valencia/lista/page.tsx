'use client'
import React from 'react'
import ListItem from '../../../components/listItem/index'
import { ListItemProps } from '@/types/Assessment'
import { AVALIACOES_FISICAS } from '@/consts/const';


const assesmentArrayAlt = AVALIACOES_FISICAS

const indiceArray: ListItemProps[] = [
    {key: 1, itemTitle: 'IMC'},
]

const ListAssessmentPage: React.FC<any> = () => {

    const headerClass = "text-white font-bold"
    const baseClasses = "flex flex-1 flex-col gap-y-2 justify-center fadeIn";

    return (
        <div className={`${baseClasses} p-8 max-w-screen-sm`}>
            <ul className={`${baseClasses} p-1`}>
                <h1 className={`${headerClass}`}>Valências Físicas</h1>
                    {assesmentArrayAlt.map(item => {
                        return (
                                <ListItem id={item.key} itemTitle={item.itemTitle} subItem={(item.subItems ? item.subItems : undefined)} />
                        );
                    })}
            </ul>
            <ul className={`${baseClasses} p-1`}>
                <h1 className={`${headerClass}`}>Índices</h1>
                    {indiceArray.map(item => {
                        return (
                            <ListItem key={item.key} itemTitle={item.itemTitle} subItem={(item.subItem ? item.subItem : undefined)} id={Number(item.key)} />
                        );
                    })}
            </ul>
            </div>
    )
}

export default ListAssessmentPage
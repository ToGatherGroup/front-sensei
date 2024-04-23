'use client'
import React from 'react'
import ListMenuItem from '../../../components/listItem/index'
import { Assessment} from '@/types/Assessment'
import { AVALIACOES_FISICAS, INDICES_FISICOS } from '@/consts/const';

const headerClass = "text-white font-bold"
const baseClasses = "flex flex-1 flex-col gap-y-2 fadeIn";

const hasMultipleAssessments = (assessments: Assessment[]) => assessments.length > 1;

const RenderList = ({ items, isIMC }: { items: typeof AVALIACOES_FISICAS | typeof INDICES_FISICOS, isIMC: boolean }) => (
    <ul className={`${baseClasses} p-1 min-w-80`}>
        <h1 className={headerClass}>{isIMC ? 'Índices' : 'Valências Físicas'}</h1>
        {items.map(({ key, itemTitle, assessments }) => (
            <ListMenuItem
                key={key}
                id={key}
                itemTitle={itemTitle}
                subItem={hasMultipleAssessments(assessments) ? assessments.map(a => a.title) : undefined}
                isIMC={isIMC}
            />
        ))}
    </ul>
);

const MenuAvaliacaoPage = () => {

    return (
        <div className={`${baseClasses} p-8 grid justify-items-center min-h-screen`}>
            <div className="m-auto">
                <RenderList items={AVALIACOES_FISICAS} isIMC={false} />
                <RenderList items={INDICES_FISICOS} isIMC={true} />
            </div>
        </div>
    )
}

export default MenuAvaliacaoPage
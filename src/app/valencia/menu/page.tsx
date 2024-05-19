'use client'
import React, { useEffect, useState } from 'react'
import ListMenuItem from '../../../components/listItem/index'
import Loading from '../../../components/loading/index'
import { Assessment} from '@/types/Assessment'
import { AVALIACOES_FISICAS, INDICES_FISICOS } from '@/consts/const';
import { useAssessmentsProvider } from '@/contexts';

const headerClass = "text-white font-bold"
const baseClasses = "flex flex-1 flex-col gap-y-2 fadeIn";

import Modal from '@/components/modal';

const hasMultipleAssessments = (assessments: Assessment[]) => assessments.length > 1;

const RenderList = ({ items, isIMC }: { items: typeof AVALIACOES_FISICAS | typeof INDICES_FISICOS, isIMC: boolean }) => (
    <ul className={`${baseClasses} p-1 min-w-80`}>
        <h1 className={headerClass}>{isIMC ? 'Índices' : 'Valências Físicas'}</h1>
        {items.map(({ key, itemTitle, assessments}) => (
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
    const {isLoading, allAssessmentsComplete, modalVisible, error, closeModal, clearError, getAllIncompleteAssessments, createAssessments} = useAssessmentsProvider();

    useEffect(() => {
        getAllIncompleteAssessments();
    }, [])
    
   
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
            <div className={`${baseClasses} p-8 grid justify-items-center min-h-screen`}>
                {modalVisible && error == '' && (
                    <div className='absolute min-h-screen w-full flex items-center justify-center bg-black/40 z-50 px-3.5'>
                        {allAssessmentsComplete && (
                            <Modal title='Deseja criar novas avaliações?' closeModal={closeModal} button={true} buttonText='Criar' buttonClick={createAssessments} />
                        )}
                    </div>
                )}
                {error != '' && (
                    <div className='absolute min-h-screen w-full flex items-center justify-center bg-black/40 z-50 px-3.5'>
                        <Modal title='Ops! Tivemos um problema...' text={error} closeModal={clearError} />
                    </div>
                )}
                <div className="m-auto">
                    <RenderList items={AVALIACOES_FISICAS} isIMC={false} />
                    <RenderList items={INDICES_FISICOS} isIMC={true} />
                </div>
            </div>
            )}
        </div>
    )
}

export default MenuAvaliacaoPage
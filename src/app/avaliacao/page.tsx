import React from 'react'
import ListItem from '../../components/listItem/index'
import Title from "../../components/title/index";

const assesmentArray = [
        {id: 1, itemTitle: 'Core'},
        {id: 2, itemTitle: 'Força Máxima'},
        {id: 3, itemTitle: 'Força Explosiva'},
        {id: 4, itemTitle: 'Força Isométrica'},
        {id: 5, itemTitle: 'Mobilidade do Tornozelo'},
        {id: 6, itemTitle: 'Resistência muscular localizada', subItem: ['Abdominal', 'MMSS']},
        {id: 7, itemTitle: 'Resistência Anaeróbica'},
        {id: 8, itemTitle: 'Resistência Aeróbica'}   
]

const indiceArray = [
    {id: 1, itemTitle: 'IMC'},
]

const ListAssessmentPage = () => {
      {/* Não vou mexer com botão, pois o componente pode ficar muito hibrido bg-red-50 / Jogar "space-y-2" (espaço entre botões para cada item, afim de respeitar o accordion) w-full min-h-dvhn min-h-screen */}
    return (
        <div className='max-h-70 max-w-lg  justify-center flex flex-1 flex-col gap-y-2 justify-center p-1 fadeIn'>
            <div className='max-h-70 max-w-lg  justify-center flex flex-1 flex-col gap-y-2 justify-center p-1 fadeIn'>
                <h1 className='text-white font-bold'>Valências Físicas</h1>
                    {assesmentArray.map(item => {
                        return (
                            <ListItem key={item.id} itemTitle={item.itemTitle} subItem={(item.subItem ? item.subItem : undefined)} />
                        );
                    })}
            </div>
            <div className='max-h-70 max-w-lg  justify-center flex flex-1 flex-col gap-y-2 justify-center p-1 fadeIn'>
                <h1 className='text-white font-bold'>Índices</h1>
                    {indiceArray.map(item => {
                        return (
                            <ListItem key={item.id} itemTitle={item.itemTitle} subItem={(item.subItem ? item.subItem : undefined)} />
                        );
                    })}
            </div>
            </div>
    )
}

export default ListAssessmentPage
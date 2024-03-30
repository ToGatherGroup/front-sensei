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

const ListAssessmentPage: React.FC<any> = () => {

    const headerClass = "text-white font-bold"
    const baseClasses = "flex flex-1 flex-col gap-y-2 justify-center fadeIn";

    return (
        <div className={`${baseClasses} p-8 max-w-screen-sm`}>
            <ul className={`${baseClasses} p-1`}>
                <h1 className={`${headerClass}`}>Valências Físicas</h1>
                    {assesmentArray.map(item => {
                        return (
                            <ListItem key={item.id} itemTitle={item.itemTitle} subItem={(item.subItem ? item.subItem : undefined)} />
                        );
                    })}
            </ul>
            <ul className={`${baseClasses} p-1`}>
                <h1 className={`${headerClass}`}>Índices</h1>
                    {indiceArray.map(item => {
                        return (
                            <ListItem key={item.id} itemTitle={item.itemTitle} subItem={(item.subItem ? item.subItem : undefined)} />
                        );
                    })}
            </ul>
            </div>
    )
}

export default ListAssessmentPage
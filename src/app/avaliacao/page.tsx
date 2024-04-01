import React from 'react'
import ListItem, { ListItemProps } from '../../components/listItem/index'

const assesmentArray: ListItemProps[] = [
        {key: 1, itemTitle: 'Core'},
        {key: 2, itemTitle: 'Força Máxima'},
        {key: 3, itemTitle: 'Força Explosiva'},
        {key: 4, itemTitle: 'Força Isométrica'},
        {key: 5, itemTitle: 'Mobilidade do Tornozelo'},
        {key: 6, itemTitle: 'Resistência muscular localizada', subItem: ['Abdominal', 'MMSS']},
        {key: 7, itemTitle: 'Resistência Anaeróbica'},
        {key: 8, itemTitle: 'Resistência Aeróbica'}
]

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
                    {assesmentArray.map(item => {
                        return (
                            <ListItem key={item.key} itemTitle={item.itemTitle} subItem={(item.subItem ? item.subItem : undefined)} />
                        );
                    })}
            </ul>
            <ul className={`${baseClasses} p-1`}>
                <h1 className={`${headerClass}`}>Índices</h1>
                    {indiceArray.map(item => {
                        return (
                            <ListItem key={item.key} itemTitle={item.itemTitle} subItem={(item.subItem ? item.subItem : undefined)} />
                        );
                    })}
            </ul>
            </div>
    )
}

export default ListAssessmentPage
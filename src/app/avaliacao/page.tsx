import React from 'react'
import ListItem from '../../components/assessment/index'
import Button from "../../components/button/index";

const assesmentArray = [
        {id: 1, itemTitle: 'Core'},
        {id: 2, itemTitle: 'Força Máxima'},
        {id: 3, itemTitle: 'Força Explosiva'},
        {id: 4, itemTitle: 'Força Isométrica'},
        {id: 5, itemTitle: 'Mobilidade do Tornozelo'},
        {id: 6, itemTitle: 'Edipo', subItem: ['abdominal', 'MMSS']},
        {id: 7, itemTitle: 'Resistência Anaeróbica'},
        {id: 8, itemTitle: 'Resistência Aeróbica'},
        {id: 9, itemTitle: 'IMC'},
]

const ListAssessmentPage = () => {
      {/* Não vou mexer com botão, pois o componente pode ficar muito hibrido */}
    return (
        <div className='min-h-screen w-full flex flex-1 flex-col items-center justify-center'>
                {assesmentArray.map(item => {
                    return (

                        // <Button label={item.itemTitle} type="button" style="btn_white" />
                        <ListItem key={item.id} itemTitle={item.itemTitle} subItem={(item.subItem ? item.subItem : undefined)} />
                    );
                })}
        </div>
    )
}

export default ListAssessmentPage
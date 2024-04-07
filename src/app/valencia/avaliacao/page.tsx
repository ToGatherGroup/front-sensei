import React from 'react'
import ListAvaliacao from '../../../components/listAvaliacao/index'

// TODO: API integration
const athletes = [
    {id: 1, name: 'Felipe Marcelino Do Nascimento'},
    {id: 2, name: 'Bruno Amado'},
    {id: 3, name: 'Alex'},
    {id: 4, name: 'Michel'},
    {id: 5, name: 'Denilson'},
    {id: 6, name: 'Maiara'},
    {id: 7, name: 'Kaka'},
    {id: 8, name: 'teste'},
]

export type AvaliacaoPageProps = {
  assessmentType: string;
};


// - TypeScript, o componente React.FC espera props definidas pelo tipo AvaliacaoPageProps
const AvaliacaoPage = ({ assessmentType }: AvaliacaoPageProps) => {
  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <div className='max-container'>
        <ListAvaliacao listAthletes={athletes} assessmentType={assessmentType}/>
      </div>
    </div>
  )
}

export default AvaliacaoPage

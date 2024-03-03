import React from 'react'
import ListAthletes from '@/components/ListAthletes/index'

const athletes = [
    {id: 1, name: 'Felipe Marcelino Do Nascimento'},
    {id: 2, name: 'Bruno Amado'},
    {id: 3, name: 'Alex'},
    {id: 4, name: 'Michel'},
    {id: 5, name: 'Denilson'},
    {id: 6, name: 'Maiara'},
    {id: 7, name: 'Kaka'},
    {id: 8, name: 'Edipo'},
]

const ListAthletesPage = () => {
  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <div className='max-container'>
        <ListAthletes listAthletes={athletes} />
      </div>
    </div>
  )
}

export default ListAthletesPage

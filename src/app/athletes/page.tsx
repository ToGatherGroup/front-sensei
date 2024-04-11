"use client"
import React, { useEffect } from 'react'
import Loading from "@/components/loading/index";
import ListAthletes from '../../components/listAthletes/index'
import { useAthleteProvider } from '@/contexts'

const ListAthletesPage = () => {
  const { listAthletes, isLoading }  = useAthleteProvider();

  useEffect(() => {
    console.log(isLoading)
  }, [isLoading])
  

  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <div className='max-container'>
        {isLoading ? (
          <Loading />
        ) : (
          <ListAthletes athletes={listAthletes} />
        )}
      </div>
    </div>
  )
}

export default ListAthletesPage

"use client";
import React from 'react'
import ListAvaliacao from '../../../../components/listAvaliacao/index'
import Loading from "@/components/loading/index";
import { useParams } from 'next/navigation'
import { useAthleteProvider } from '@/contexts'

type Params = {
  id: string;
  index?: string
};

type Props = {
  params: Params;
};

const ListAvaliacaoPage = ({ params }: Props) => {
  const parametros = useParams<{ id: string;}>()
  const { listAthletes, isLoading }  = useAthleteProvider();

  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <div className='max-container'>
        {isLoading ? (
          <Loading />
        ) : (
          <ListAvaliacao listAthletes={listAthletes} identificador={parametros.id}  />
        )}
      </div>
    </div>
  )
}

export default ListAvaliacaoPage

// https://nextjs.org/docs/app/api-reference/functions/use-params
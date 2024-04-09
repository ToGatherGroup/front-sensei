'use client';
import React from 'react'
import ListAvaliacao from '../../../../components/listAvaliacao/[id]/index'
import { useParams } from 'next/navigation'
import { AVALIACOES_FISICAS } from '@/consts/const';
import { useRouter, NextRouter } from 'next/router';

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
  id: number;
};

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const AvaliacaoPage = ({ params }: Props) => {
  const parametrosAlt = useParams<{ id: string}>()
  // const router: NextRouter = useRouter();
  // const { id } = router.query;

  // const avaliacao = AVALIACOES_FISICAS[Number(id)] //TODO: desacoplar o id do array de avaliações
  // console.log(avaliacao)
  // console.log(AVALIACOES_FISICAS[Number(id)])
  // console.log(id)
  // Poh, talvez eu tenha que pegar a const aqui ??

// -----------------------------------------------
// Doc diz que posso usar assim:

// 'use client'
// import { useParams } from 'next/navigation'
 
// export default function ExampleClientComponent() {
//   const params = useParams<{ tag: string; item: string }>()
 
//   // Route -> /shop/[tag]/[item]
//   // URL -> /shop/shoes/nike-air-max-97
//   // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
//   console.log(params)
 
//   return <></>
// }
// -----------------------------------------------

  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <div className='max-container'>
        <ListAvaliacao listAthletes={athletes} identificador={Number(parametrosAlt.id)} />
      </div>
    </div>
  )
}

export default AvaliacaoPage

// https://nextjs.org/docs/app/api-reference/functions/use-params
import AvaliacaoPage from "./valencia/avaliacao/page";

//TODO: Vou ter que receber essa lista de um local comum (extrair para enums ou const)
import { ListItemProps } from '../components/listItem/index'
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

export default function Home() {
  return (
   <main className="h-screen flex items-center justify-center">
      <AvaliacaoPage assessmentType="Core"/>
   </main>
  );
}

//ListAvaliaçãoPage precisará receber o tipo de avaliação como props
// para rendererizar o tipo de input e o título correto
// O título capaz que também será um enum ou const (sepá já pode ser no assesmentArray como outro campo "itemAssessmentType")
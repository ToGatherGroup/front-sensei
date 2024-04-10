import ListAvaliacaoPage from "./valencia/avaliacao/[id]/page";

//TODO: Vou ter que receber essa lista de um local comum (extrair para enums ou const)
// Isso aqui é tudo temporário, depois vou matar essa tela toda com a do Charles de menu (eu acho)


export default function Home() {
  return (
   <main className="h-screen flex items-center justify-center">
      <ListAvaliacaoPage params={{ id: "" }}/>
   </main>
  );
}

//ListAvaliaçãoPage precisará receber o tipo de avaliação como props
// para rendererizar o tipo de input e o título correto
// O título capaz que também será um enum ou const (sepá já pode ser no assesmentArray como outro campo "itemAssessmentType")
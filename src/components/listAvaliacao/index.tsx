import Button from "../button/index";
import { AVALIACOES_FISICAS } from "@/consts/const";

type ListAvaliacaoProps = {
    identificador: number;
    listAthletes: AthletesProps[];
    //header: string;
    isIMC?: boolean;
}

type AthletesProps = {
    id: number | string;
    name: string;
}


export default function ListAvaliacao({ listAthletes, isIMC, identificador } : ListAvaliacaoProps){


    // TODO: desacoplar o id do array de avaliações
    const tituloAvaliacao = AVALIACOES_FISICAS[identificador].assessments[0].title // validar se tem subItem, caso tenha, pegar segundo parâmetro para navegar na array de assessments
    const tipoAvaliacao = AVALIACOES_FISICAS[identificador].assessments[0].type
    console.log(`identificador chegando: ${identificador}`)

    return (
        <form className="bg-defaultGray px-36 py-20 rounded-md">
            <h2 className="font-bold uppercase text-4xl mb-10">{tituloAvaliacao}</h2>
            <ul className="w-full grid  justify-items-stretch">
                {listAthletes.map((athlete) => (
                    <li className="bg-green-500 border-4 border-light-blue-500 border-opacity-100  flex items-center justify-between gap-2 mb-3" key={athlete.id}>
                        <span className="bg-blue-500 uppercase text-lg whitespace-nowrap">{athlete.name}</span>
                        <div> 
                            {isIMC && <input key={athlete.id}/>}
                            <input id="idAthlete" type={tipoAvaliacao} value={athlete.id} className="w-20 h-8 bg-gray-100 rounded-md border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        </div>
                    </li>
                ))}
            </ul>
            <Button label="Finalizar Exercício" type="submit" />
        </form>
    )

// Puxar algo similar pra renderizar o segundo botão:
//     
}
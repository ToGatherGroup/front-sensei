import Button from "../button/index";
import { AVALIACOES_FISICAS, INDICES_FISICOS } from "@/consts/const";

type ListAvaliacaoProps = {
    identificador: number | string;
    listAthletes: AthletesProps[];
    isIMC?: boolean;
    identificadorSubItem?: number;
}

type AthletesProps = {
    id: number | string;
    name: string;
}


export default function ListAvaliacao({ listAthletes, isIMC, identificador } : ListAvaliacaoProps){

    let tituloAvaliacao = "Avaliação Física" // Default
    let tipoAvaliacao = "Avaliação Física" // Default

    console.log(`Identificador chegando: ${identificador}`)
    console.log(`isIMC chegando: ${isIMC}`)

    //TODO: Guardar n'um utils
    const identificadorStr = String(identificador);
    const regex = /^(.+)-(.+)$/; // Regex para identificar se a string contém um hífen no meio
    const match = identificadorStr.match(regex);
    console.log(`IdentificadorStr: ${identificadorStr}`)
    let identificadorSubItem = 0;
    console.log(`Macthou?: ${match}`)
    if (match) {
     identificador = Number(match[1]);
     identificadorSubItem = Number(match[2]);
    }
    const assessmentIndex = identificadorSubItem ? identificadorSubItem : 0

    // TODO: refatorar para um switch case -?-
    // TODO: desacoplar/refatorar o id do array de avaliações/indices
    if (Number(identificador) < Number(8)) {    
        console.log(`identificador setando AVALIACOES_FISICAS: ${identificador}`)    
        tituloAvaliacao = AVALIACOES_FISICAS[Number(identificador)].assessments[assessmentIndex].title // Validar se tem subItem, caso tenha, pegar segundo parâmetro para navegar na array de assessments
        tipoAvaliacao = AVALIACOES_FISICAS[Number(identificador)].assessments[assessmentIndex].type
        
    } else {
    // TODO: tirar magic number
        identificador = 8; // Hide any possible pagination error
        console.log(`identificador setando INDICES_FISICOS: ${identificador}`)  
        tituloAvaliacao = INDICES_FISICOS[0].assessments[assessmentIndex].title // Validar se tem subItem, caso tenha, pegar segundo parâmetro para navegar na array de assessments
        tipoAvaliacao = INDICES_FISICOS[0].assessments[assessmentIndex].type
        isIMC = true
    }

    return (
        <form className="bg-defaultGray px-36 py-20 rounded-md">
            <h2 className="font-bold uppercase text-4xl mb-10">{tituloAvaliacao}</h2>
            <ul className="w-full grid  justify-items-stretch">
                {listAthletes.map((athlete) => (
                    <li className="border-4 border-light-blue-500 border-opacity-100 flex items-center justify-between gap-2 mb-3" key={athlete.id}>
                        <span className="uppercase text-lg whitespace-nowrap">{athlete.name}</span>
                        <div> 
                            {isIMC && <input placeholder="Peso (kg)" type="number" key={athlete.id} className="w-20 h-8 bg-gray-100 rounded-md border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>}
                            <input id="idAthlete" type={tipoAvaliacao} className="w-20 h-8 bg-gray-100 rounded-md border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        </div>
                    </li>
                ))}
            </ul>
            <Button label="Finalizar Exercício" type="submit" />
        </form>
    )   
}
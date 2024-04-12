import Button from "../button/index";
import { AVALIACOES_FISICAS, INDICES_FISICOS } from "@/consts/const";
import { useState } from "react";

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

    function getDate() {
        const today = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' });
        const formattedDate = formatter.format(today);
        return formattedDate.replace(' de ', '/');
      }

    const [currentDate, setCurrentDate] = useState(getDate());

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
        <div className="  min-h-screen flex items-center justify-center">
        <form className="bg-gray-200 p-8 rounded-lg shadow-md  w-90">
        <h2 className="text-2xl font-semibold mb-6 text-center">{tituloAvaliacao}</h2>

        <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700 mr-2">Data:</label>
            <input type="text" readOnly className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 text-center" value={currentDate} />
        </div>

            <ul className="w-full grid  justify-items-stretch">
                {listAthletes.map((athlete) => (
                    <li key={athlete.id} className="flex justify-around items-center py-2 ">
                        <span className="uppercase text-gray-700 w-40 text-xs font-semibold">{athlete.name}</span>
                        <div className="flex flex-row space-x-2"> 
                            {isIMC && <input placeholder="Peso" key={athlete.id} className=" text-sm w-14 h-8 bg-gray-100 rounded-md border-gray-300 placeholder:italic placeholder:text-slate-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>}
                            <input id="idAthlete" type={tipoAvaliacao} className="pl-2 w-14 h-8 bg-gray-100 rounded-md border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        </div>
                    </li>
                ))}
            </ul>
            <Button label="Finalizar Exercício" type="submit" />
        </form>
    </div>
    )   
}
'use client'
import Button from "../button/index";
import { AVALIACOES_FISICAS, INDICES_FISICOS } from "@/consts/const";
import { useAthleteProvider } from "@/contexts";
import { useState } from "react";
import { ListAthletesProps } from "@/contexts/athlete/athlete.type";

type ListAvaliacaoProps = {
    identificador: number | string;
    listAthletes: ListAthletesProps | null;
    isIMC?: boolean;
    identificadorSubItem?: number;
}

type FormValues = {
    [key: number]: string;
};

export default function ListAvaliacao({ listAthletes, isIMC, identificador } : ListAvaliacaoProps){
    const { call, success, error } = useAthleteProvider()
    const [formValues, setFormValues] = useState<FormValues>({});

    const handleInputChange = (athleteId: number, value: string) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [athleteId]: value
        }));
    };

    const getDate = () => {
        const today = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' });
        const formattedDate = formatter.format(today);
        return formattedDate.replace(' de ', '/');
    }

    const [currentDate, setCurrentDate] = useState(getDate());

    let tituloAvaliacao = "Avaliação Física" // Default
    let tipoAvaliacao = "Avaliação Física" // Default

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Console.log enquanto não houver integração com API
        console.log(`identificador: ${identificador}`)
        console.log(`isIMC: ${isIMC}`)
        console.log(`currentDate: ${currentDate}`)
        console.log(`tituloAvaliacao: ${tituloAvaliacao}`)
        console.log(`tipoAvaliacao: ${tipoAvaliacao}`)
        console.log(formValues); // Aqui você pode também logar outras informações se necessário
    };

    //TODO: Guardar n'um utils
    const identificadorStr = String(identificador);
    const regex = /^(.+)-(.+)$/; // Regex para identificar se a string contém um hífen no meio
    const match = identificadorStr.match(regex);
    let identificadorSubItem = 0;
    if (match) {
     identificador = Number(match[1]);
     identificadorSubItem = Number(match[2]);
    }
    const assessmentIndex = identificadorSubItem ? identificadorSubItem : 0

    // TODO: refatorar para um switch case -?-
    // TODO: desacoplar/refatorar o id do array de avaliações/indices
    if (Number(identificador) < Number(8)) {       
        tituloAvaliacao = AVALIACOES_FISICAS[Number(identificador)].assessments[assessmentIndex].title // Validar se tem subItem, caso tenha, pegar segundo parâmetro para navegar na array de assessments
        tipoAvaliacao = AVALIACOES_FISICAS[Number(identificador)].assessments[assessmentIndex].type
        
    } else {
    // TODO: tirar magic number
        identificador = 8; // Hide any possible pagination error
        tituloAvaliacao = INDICES_FISICOS[0].assessments[assessmentIndex].title
        tipoAvaliacao = INDICES_FISICOS[0].assessments[assessmentIndex].type
        isIMC = true
    }

    return (
        <form className="bg-defaultGray px-10 py-6 sm:px-8 sm:py-4 md:px-24 md:py-16 xl:px-36 xl:py-20 rounded-md max-h-[650px] overflow-y-auto custom-scrollbar" onSubmit={handleSubmit} >
        <h2 className="font-bold uppercase xl:text-4xl md:text-1xl sm:text-lg text-lg xl:mb-10 md:mb-7 sm:mb-5 mb-5 text-center">{tituloAvaliacao}</h2>

        <div className="flex items-center justify-center mb-4">
            <label className="block text-gray-700 mr-2">Data:</label>
            <input type="text" readOnly className="italic text-slate-400 block w-18 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 text-center" value={currentDate} />
        </div>

            <ul className="w-full xl:mb-10 md:mb-7 sm:mb-5 mb-5">
                {listAthletes?.data?.map((athlete) => (
                    <li key={athlete.id} className="flex items-center justify-between xl:gap-4 md:gap-4 sm:gap-4 gap-4 xl:mb-6 md:mb-4 sm:mb-2 mb-2">
                        <span className="uppercase xl:text-md md:text-base sm:text-sm text-sm ">{athlete?.nome}</span>
                        <div className="flex flex-row space-x-2"> 
                            {isIMC && 
                            <input 
                                placeholder="Peso" 
                                key={athlete?.id} 
                                className="placeholder:italic placeholder:text-slate-400 xl:w-14 md:w-12 sm:w-8 w-14 xl:h-12 md:h-10 sm:h-6 h-6 bg-gray-100 rounded-md border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            </input>}
                            <input 
                                id="idAthlete" 
                                type={tipoAvaliacao} 
                                value={formValues[athlete.id] || ''} 
                                onChange={(e) => handleInputChange(athlete.id, e.target.value)} 
                                className="xl:w-14 md:w-12 sm:w-8 w-14 xl:h-8 md:h-10 sm:h-6 h-6 bg-gray-100 rounded-md border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            </input>
                        </div>
                    </li>
                ))}
            </ul>
            <Button label="Finalizar Exercício" type="submit" />
            {success && (
                <p className="xl:text-base md:text-sm sm:text-xs text-xs text-center text-green-400 xl:mt-10 md:mt-7 sm:mt-5 mt-5 font-bold">{success}</p>
            )}
            {error && (
                <p className="xl:text-base md:text-sm sm:text-xs text-xs text-center text-orange-700 xl:mt-10 md:mt-7 sm:mt-5 mt-5 font-bold">{error}</p>
            )}
        </form>
    )   
}
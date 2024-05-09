'use client'
import Button from "../button/index";
import { AVALIACOES_FISICAS, INDICES_FISICOS } from "@/consts/const";
import { useAthleteProvider } from "@/contexts";
import { useState } from "react";
import { ListAthletesProps } from "@/contexts/athlete/athlete.type";
import { FormWrapper } from "../formWrapper";
import { Assessment } from "@/types/Assessment";
import TimeInput from "../timeInput";


type ListAvaliacaoProps = {
    identificador: number | string;
    listAthletes: ListAthletesProps | null;
    isIMC?: boolean;
    identificadorSubItem?: number;
}

type FormValues = {
    [key: number]: string;
};

export default function ListAvaliacao({ listAthletes, isIMC, identificador }: ListAvaliacaoProps) {
    const { call, success, error } = useAthleteProvider()
    const [formValues, setFormValues] = useState<FormValues>({});
    const [altFormValues, setAltFormValues] = useState<FormValues>({});

    let tituloAvaliacao = "Avaliação Física" // Default
    //let tipoAvaliacao: typeof Object | string = "Avaliação Física" // Default

    // Handlers
    const handleInputChange = (athleteId: number, value: string, altInput: boolean) => {
        let filteredValue = value.replace(/[^0-9.,]/g, '');
        if (altInput) {
            setAltFormValues(prevValues => ({ ...prevValues, [athleteId]: filteredValue }));
            return;
        }
        setFormValues(prevValues => ({ ...prevValues, [athleteId]: filteredValue }));
    };

    const handleTimeChange = (minutes: number, seconds: number) => {
        console.log(`Tempo atualizado: ${minutes} minutos e ${seconds} segundos`);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Console.log enquanto não houver integração com API
        console.log(`identificador: ${identificador}`)
        console.log(`isIMC: ${isIMC}`)
        console.log(`currentDate: ${currentDate}`)
        console.log(`tituloAvaliacao: ${tituloAvaliacao}`)
        console.log(`tipoAvaliacao: ${tipoAvaliacao}`)
        console.log(`formValues: ${JSON.stringify(formValues)}`);
        console.log(`altFormValues: ${JSON.stringify(altFormValues)}`);
    };
    //------------------------//

    //TODO: Guardar n'um utils
    const getDate = () => {
        const today = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' });
        const formattedDate = formatter.format(today);
        return formattedDate.replace(' de ', '/');
    }
    const [currentDate, setCurrentDate] = useState(getDate());

    const identificadorStr = String(identificador);
    const regex = /^(.+)-(.+)$/; // Regex checking if a string has "-" somewhere in it
    const match = identificadorStr.match(regex);
    let identificadorSubItem = 0;
    if (match) {
        identificador = Number(match[1]);
        identificadorSubItem = Number(match[2]);
    }
    //------------------------//

    let assessmentIndex = identificadorSubItem && identificadorSubItem < 1 ? identificadorSubItem : 0 // Hide any possible pagination error manually
    let assessment: Assessment | null = null;
    if (Number(identificador) < Number(8)) {
        assessment = AVALIACOES_FISICAS[Number(identificador)].assessments[assessmentIndex];
    } else {
        // TODO: tirar magic number
        assessment = INDICES_FISICOS[0].assessments[assessmentIndex];
        isIMC = true
    }

    tituloAvaliacao = assessment.altTitle ? assessment.altTitle : assessment.title
    let tipoAvaliacao = assessment.type

    return (
        <FormWrapper header={tituloAvaliacao} handleSubmit={handleSubmit}>
            <div className="flex items-center justify-center mb-4">
                <label className="block text-gray-700 mr-2">Data:</label>
                <input type="text" disabled readOnly className={styles.dateInput} value={currentDate} />
            </div>

            <ul className="w-full xl:mb-10 md:mb-7 sm:mb-5 mb-5">
            {isIMC && <div className="flex flex-row space-x-2 justify-end"><h3 className={styles.inputHeader}>Peso:</h3> <h3 className={styles.inputHeader}>Altura:</h3></div>}
                {listAthletes?.data?.map((athlete) => (
                    <li key={athlete.id} className={styles.listItem}>
                        <span className={styles.athleteNameSpan}>{athlete?.nome}</span>
                        <div className="flex flex-row space-x-2">
                            {isIMC &&
                                <input
                                    id="idAthlete"
                                    placeholder="Kg"
                                    type="number"
                                    key={athlete?.id}
                                    value={altFormValues[athlete.id] || ''}
                                    onChange={(e) => handleInputChange(athlete.id, e.target.value, true)}
                                    className={(styles.input)}>
                                </input>}
                            {tipoAvaliacao.key == "Tempo" &&
                                <TimeInput onTimeChange={handleTimeChange} />
                            }
                            {tipoAvaliacao.key != "Tempo" &&
                            
                                <input
                                    id="idAthlete"
                                    placeholder={tipoAvaliacao.key}
                                    type={tipoAvaliacao.value}
                                    value={formValues[athlete.id] || ''}
                                    onChange={(e) => handleInputChange(athlete.id, e.target.value, false)}
                                    className={`${styles.input} ${tipoAvaliacao.key == "Repeticao" ? "w-24" : ""}`}>
                                </input>
                            }
                        </div>
                    </li>
                ))}
            </ul>
            <Button label="Finalizar Exercício" type="submit" />
            {success && (
                <p className={styles.feedbackParagraph}>{success}</p>
            )}
            {error && (
                <p className={styles.feedbackParagraph}>{error}</p>
            )}
        </FormWrapper>
    )
}

//TODO: extrair para um arquivo de estilos, sugestão alternativa de organização -?-
const styles = {
    inputHeader: "w-20 h-6 block text-gray-700 xl:text-base md:text-sm sm:text-xs text-xs",
    input: "w-20 h-6 rounded-md focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 placeholder:italic placeholder:text-slate-400 placeholder:text-xs",
    feedbackParagraph: "xl:text-base md:text-sm sm:text-xs text-xs text-center text-orange-700 xl:mt-10 md:mt-7 sm:mt-5 mt-5 font-bold",
    athleteNameSpan: "uppercase xl:text-base md:text-sm sm:text-xs text-xs truncate",
    dateInput: "italic text-slate-400 block w-fit border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 text-center",
    listItem: "flex items-center justify-between xl:gap-4 lg:gap-4 md:gap-4 sm:gap-4 gap-4 xl:mb-6 lg:mb-4 md:mb-4 sm:mb-2 mb-4 max-h-[24px]",
}
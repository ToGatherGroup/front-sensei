'use client'
import Button from "../button/index";
import { AVALIACOES_FISICAS, INDICES_FISICOS } from "@/consts/const";
import { useAssessmentsProvider, useAthleteProvider } from "@/contexts";
import { useEffect, useState } from "react";
import { ListAthletesProps } from "@/contexts/athlete/athlete.type";
import { FormWrapper } from "../formWrapper";
import { Assessment } from "@/types/Assessment";
import TimeInput from "../timeInput";
import Loading from '../../components/loading/index'
import Modal from "../modal";
import { useRouter } from "next/navigation";

type ListAvaliacaoProps = {
    identificador: number | string;
    isIMC?: boolean;
    identificadorSubItem?: number;
}

type FormValues = {
    [key: number]: string;
};

export default function ListAvaliacao({ isIMC, identificador }: ListAvaliacaoProps) {
    const { collectiveAssessment, success, error } = useAthleteProvider()
    const [formValues, setFormValues] = useState<FormValues>({});
    const {isLoading, error: errorAssessments, listAthletes, success: successAssessments, clearError, clearSuccess, getIncompleteAssessments} = useAssessmentsProvider();
    const [currentDate, setCurrentDate] = useState<string>('');
    const [tituloAvaliacao, setTituloAvaliacao] = useState<string>('');
    const [tipoAvaliacao, setTipoAvaliacao] = useState<{key: string, value: string}>({key: '', value: ''});
    const [avaliacao, setAvaliacao] = useState<Assessment | null>(null);

    const router = useRouter()

    const handleInputChange = (athleteId: number, value: string, altInput: boolean) => {
        let filteredValue = value.replace(/[^0-9.,]/g, '');
        setFormValues(prevValues => ({ ...prevValues, [athleteId]: filteredValue }));
    };

    const handleTimeChange = (minutes: number, seconds: number) => {
        console.log(`Tempo atualizado: ${minutes} minutos e ${seconds} segundos`);
    };

    const handleSubmit = (tipoValencia: string) => (event: React.FormEvent) => {
        event.preventDefault();
        if (formValues && Object.keys(formValues).length > 0) {
        
            const payload = Object.entries(formValues).map(([athleteId, value]) => ({
                resultado: {
                    [tipoValencia]: parseFloat(value),
                },
                atletaId: parseInt(athleteId, 10)
            }));
            console.log("Payload para API:", JSON.stringify(payload));
            collectiveAssessment(payload);
        }
    };

    const getDate = () => {
        const today = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' });
        const formattedDate = formatter.format(today);
        return formattedDate.replace(' de ', '/');
    };

    const goToMenu = () => {
        router.push('/valencia/menu')
    }

    useEffect(() => {
        setCurrentDate(getDate());
        const identificadorStr = String(identificador);
        const regex = /^(.+)-(.+)$/;
        const match = identificadorStr.match(regex);
        let identificadorSubItem = 0;
        if (match) {
            identificador = Number(match[1]);
            identificadorSubItem = Number(match[2]);
        }
        
        let assessmentIndex = identificadorSubItem && identificadorSubItem < 1 ? identificadorSubItem : 0;
        let assessment: Assessment | null = null;

        if (Number(identificador) < Number(8)) {
            assessment = AVALIACOES_FISICAS[Number(identificador)].assessments[assessmentIndex];
            getIncompleteAssessments(AVALIACOES_FISICAS[Number(identificador)].assessments[assessmentIndex].slug);
        } else {
            assessment = INDICES_FISICOS[0].assessments[assessmentIndex];
            getIncompleteAssessments(INDICES_FISICOS[0].assessments[assessmentIndex].slug);
        }
        setTituloAvaliacao(assessment.altTitle ? assessment.altTitle : assessment.title);
        setTipoAvaliacao(assessment.type);
        setAvaliacao(assessment);
    }, [identificador]);

    return (
        <div className='min-h-screen w-full flex items-center justify-center'>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='min-h-screen w-full flex items-center justify-center'>
                    {error != '' && (
                        <div className='absolute min-h-screen w-full flex items-center justify-center bg-black/40 z-50 px-3.5'>
                            <Modal title='Ops! Tivemos um problema...' text={errorAssessments} closeModal={clearError} />
                        </div>
                    )}
                    {successAssessments != '' && (
                        <div className='absolute min-h-screen w-full flex items-center justify-center bg-black/40 z-50 px-3.5'>
                            <Modal title='Tudo certo!' text={successAssessments} closeModal={clearSuccess} button={true} buttonText="Voltar ao menu" buttonClick={goToMenu} />
                        </div>
                    )}
                    <FormWrapper header={tituloAvaliacao} handleSubmit={handleSubmit(avaliacao?.slug ? avaliacao?.slug : "fudeu")}>
                        <div className="flex items-center justify-center mb-4">
                            <label className="block text-gray-700 mr-2">Data:</label>
                            <input type="text" disabled readOnly className={styles.dateInput} value={currentDate} />
                        </div>

                        <ul className="w-full xl:mb-10 md:mb-7 sm:mb-5 mb-5">
                            {listAthletes?.data?.map((athlete) => (
                                <li key={athlete.id} className={styles.listItem}>
                                    <span className={styles.athleteNameSpan}>{athlete?.nome}</span>
                                    <div className="flex flex-row space-x-2">
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
                </div>
            )}
        </div>      
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

import { createContext, useContext, useEffect, useState } from "react";
import { useApiProvider } from "../api/api";
import { useRouter } from "next/navigation";
import { ListAthletesProps } from "./assessments.type";

type AssessmentsState = {
    isLoading: boolean;
    success: string;
    error: string;
    allAssessmentsComplete: boolean;
    modalVisible: boolean;
    listAthletes: ListAthletesProps | null;
    createAssessments: () => void;
    getIncompleteAssessments: (param: string) => void;
    getAllIncompleteAssessments: () => void;
    closeModal: () => void;
    clearError: () => void;
    clearSuccess: () => void;
}

const initialState = {
    isLoading: false,
    success: '',
    error: '',
    allAssessmentsComplete: false,
    modalVisible: false,
    listAthletes: null,
    createAssessments: () => {},
    getIncompleteAssessments: () => {},
    getAllIncompleteAssessments: () => {},
    closeModal: () => {},
    clearError: () => {},
    clearSuccess: () => {},
}

const AssessmentsContext = createContext<AssessmentsState>(initialState);

export const AssessmentsProvider = ({ children }: {children: React.ReactNode}) => {
    const { get, post } = useApiProvider();
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [allAssessmentsComplete, setAllAssessmentsComplete] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [listAthletes, setListAthletes] = useState<ListAthletesProps | null>(null);

    const router = useRouter()

    useEffect(() => {
        setError("")
        setSuccess("")
        setModalVisible(false)
    }, []);

    const getAllIncompleteAssessments = async () => {
        setIsLoading(true)
        try {
            const response = await get('/avaliacoes_incompletas/verificar');
            // Este endpoint retorna se há avaliações incompletas (True ou false)
            // A negação feita abaixo para saber se aparece ou não o modal de criação de nova avaliação;
            if(response) {
                setModalVisible(!response?.data); 
                setAllAssessmentsComplete(!response?.data);    
            }
        } catch (error) {
            setError("Erro ao carregar a lista de avaliações incompletas");
        } finally {
            setIsLoading(false)
        }
    };

    const getIncompleteAssessments = async (slug: string) => {
        setIsLoading(true)
        clearStates();
        if(slug == '') return;
        try {
            const response = await get(`/avaliacoes_incompletas/${slug}`);
                    
            if(response?.data.length > 0) {
                response?.data.sort((a:any, b:any) => {
                    const nomeA = a.nome.toLowerCase();
                    const nomeB = b.nome.toLowerCase();
                    
                    if (nomeA < nomeB) {
                      return -1;
                    }
                    if (nomeA > nomeB) {
                      return 1;
                    }
                    return 0;
                  });
                  
                setListAthletes(response)    
            } else {
                setSuccess(`Todas as avaliações dessa valência física foram feitas.`)
            }
        } catch (error) {
            setError("Erro ao carregar a lista de avaliações incompletas");
        } finally {
            setIsLoading(false)
        }
    };

    const createAssessments = async () => {
        setIsLoading(true)
        clearStates();
        try {
            const response = await post('/avaliacao/coletiva', {});
    
            if (response?.status == 204 || response?.status == 200) {
                router.push('/valencia/menu')
            }
        } catch (error) {
            setError("Erro criar avaliações");
        } finally {
            setIsLoading(false)
        }
    };

    const closeModal = () => {
        setModalVisible(false)
    }

    const clearError = () => {
        setError('')
    }

    const clearSuccess = () => {
        setSuccess('')
    }

    const clearStates = () => {
        setError("")
        setSuccess("")
        setModalVisible(false)
    }

    return (
        <AssessmentsContext.Provider value={{isLoading, success, error, allAssessmentsComplete, modalVisible, listAthletes, createAssessments, closeModal, clearError, clearSuccess, getAllIncompleteAssessments, getIncompleteAssessments}}>
            {children}
        </AssessmentsContext.Provider>
    )
}

export const useAssessmentsProvider = () => useContext(AssessmentsContext)
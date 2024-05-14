import { createContext, useContext, useEffect, useState } from "react";
import { useApiProvider } from "../api/api";
import { useRouter } from "next/navigation";


type AssessmentsState = {
    isLoading: boolean;
    success: string;
    error: string;
    hasIncompleteAssessments: boolean;
    modalVisible: boolean;
    createAssessments: () => void;
    closeModal: () => void;
    clearError: () => void;
}

const initialState = {
    isLoading: false,
    success: '',
    error: '',
    hasIncompleteAssessments: false,
    modalVisible: false,
    createAssessments: () => {},
    closeModal: () => {},
    clearError: () => {},
}

const AssessmentsContext = createContext<AssessmentsState>(initialState);

export const AssessmentsProvider = ({ children }: {children: React.ReactNode}) => {
    const { get, post } = useApiProvider();
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasIncompleteAssessments, setHasIncompleteAssessments] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const router = useRouter()

    useEffect(() => {
        setError("")
        setSuccess("")
        setModalVisible(false)
        getIncompleteAssessments();
    }, []);

    const getIncompleteAssessments = async () => {
        setIsLoading(true)
        try {
            const response = await get('/avaliacoes_incompletas');
            if(response?.data.length > 0) {
                setHasIncompleteAssessments(true)
            } else {
                clearStates()
                setHasIncompleteAssessments(false)
            }
        } catch (error) {
            setError("Erro ao carregar a lista de avaliações incompletas");
        } finally {
            setIsLoading(false)
        }
    };

    const createAssessments = async () => {
        setIsLoading(true)
        try {
            const response = await post('/avaliacao/coletiva', {});
    
            if (response?.status == 204 || response?.status == 200) {
                clearStates();
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

    const clearStates = () => {
        setError("")
        setSuccess("")
        setModalVisible(false)
    }

    return (
        <AssessmentsContext.Provider value={{isLoading, success, error, hasIncompleteAssessments, modalVisible, createAssessments, closeModal, clearError}}>
            {children}
        </AssessmentsContext.Provider>
    )
}

export const useAAssessmentsProvider = () => useContext(AssessmentsContext)
import { createContext, useContext, useEffect, useState } from "react";
import { useApiProvider } from "../api/api";
import { ListAthletesProps } from "./athlete.type";


type AthleteState = {
    listAthletes: ListAthletesProps | null;
    isLoading: boolean;
    success: string;
    error: string;
    call: (ids: number[]) => void
}

const initialState = {
    listAthletes: null,
    isLoading: false,
    success: '',
    error: '',
    call: () => {}
}

const AthleteContext = createContext<AthleteState>(initialState);

export const AthleteProvider = ({ children }: {children: React.ReactNode}) => {
    const { get, post } = useApiProvider();
    const [listAthletes, setListAthletes] = useState<ListAthletesProps | null>(null);
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setError("")
        setSuccess("")
        fetchAthletes();
    }, []);

    const fetchAthletes = async () => {
        setIsLoading(true)
        try {
            const response = await get('/atleta/lista');
            if(response?.data) {
                setListAthletes(response?.data);
            }
        } catch (error) {
            setError("Erro ao carregar a lista de atletas");
        } finally {
            setIsLoading(false)
        }
    };
    
    const call = async (ids: number[]) => {
        setIsLoading(true)
        try {
            const response = await post('atleta/chamada', JSON.stringify(ids));
            
            if (response?.status == 204) {
                setSuccess("Chamamada realizada!")
            } else {
                setError("Tivemos um problema ao realizar a chamada, por favor, tente novamente mais tarde!")
            }
        } catch (error) {
            setError("Erro ao realizar a chamada, por favor, tente novamente mais tarde!")
        } finally {
            setIsLoading(false)
        }
    }
        
    return (
        <AthleteContext.Provider value={{isLoading, listAthletes, success, error, call}}>
            {children}
        </AthleteContext.Provider>
    )
}

export const useAthleteProvider = () => useContext(AthleteContext)
import { createContext, useContext, useEffect, useState } from "react";
import { useApiProvider } from "../api/api";
import { AthleteProfileProps, ListAthletesProps, MedalsProps } from "./athlete.type";
import { useRouter } from "next/navigation";
import { Atleta } from "@/types/TAtleta";


type AthleteState = {
    listAthletes: ListAthletesProps | null;
    isLoading: boolean;
    injuries: string[];
    injuriesDescription: string[];
    athleteProfile: AthleteProfileProps | null;
    athlete: Atleta | null;
    medals: MedalsProps;
    success: string;
    error: string;
    call: (ids: number[]) => void;
    getProfile: (id: number | string) => void;
    getAthlete: (id: number | string) => void;
    getInjuries: (id: number | string) => void;
    registerAthlete: (athlete: Atleta) => void;
    updateAthlete: (athlete: Atleta) => void;
}

const initialState = {
    listAthletes: null,
    isLoading: false,
    injuries: [],
    injuriesDescription: [],
    athleteProfile: null,
    athlete: null,
    medals: [],
    success: '',
    error: '',
    call: () => {},
    getInjuries: () => {},
    getAthlete: () => {},
    getProfile: () => {},
    registerAthlete: () => {},
    updateAthlete: () => {}
}

const AthleteContext = createContext<AthleteState>(initialState);

export const AthleteProvider = ({ children }: {children: React.ReactNode}) => {
    const { get, post, put } = useApiProvider();
    const [listAthletes, setListAthletes] = useState<ListAthletesProps | null>(null);
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [injuries, setInjuries] = useState<string[]>([]);
    const [athleteProfile, setAthleteProfile] = useState<AthleteProfileProps | null>(null);
    const [athlete, setAthlete] = useState<Atleta | null>(null);
    const [medals, setMedals] = useState<MedalsProps>([]);
    const [injuriesDescription, setInjuriesDescription] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()

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
                setListAthletes(response);
            }
        } catch (error) {
            setError("Erro ao carregar a lista de atletas");
        } finally {
            setIsLoading(false)
        }
    };

    const getProfile = async (id: number | string) => {
        setIsLoading(true)
        try {
            const response = await get(`/atleta/ficha/${id}`);
            setAthleteProfile(response?.data);
            setMedals(response?.data?.medalhaDTO);
           
        } catch (error) {
            console.error("Erro ao obter dados do perfil atleta", error);
        } finally {
            setIsLoading(false)
        }
      };

    const getAthlete = async (id: number | string) => {
        setIsLoading(true)
        try {
            const response = await get(`/atleta/${id}`);
            setAthlete(response?.data);
        } catch (error) {
            console.error("Erro ao obter dados do atleta", error);
        } finally {
            setIsLoading(false)
        }
     };

    const updateAthlete = async (athleteData: Atleta) => {
        setIsLoading(true)
        try {            
            const preparedAthlete = {... athleteData, isAtivo: !!athleteData.isAtivo, foto: athlete?.foto}
            const response = await put('atleta', preparedAthlete);
           
            if (response) {
                router.push('/atleta/buscar')
            }
            
        } catch (error) {
            console.error("Erro ao atualizar dados do atleta", error);
        } finally {
            setIsLoading(false)
        }
    };

    const registerAthlete = async (athleteData: Atleta) => {
        setIsLoading(true)
        try {
            const preparedAthlete = {... athleteData, isAtivo: !!athleteData.isAtivo}
            const response = await post('atleta', preparedAthlete);

            if (response) {
                router.push('/atleta/buscar')
            }
        } catch (error) {
            console.error("Erro ao cadastrar dados do atleta", error);
        } finally {
            setIsLoading(false)
        }
    };

    const getInjuries = async (id: number | string) => {
        setIsLoading(true)
        try {
            const response = await get(`lesao/${id}`);

            if (response) { 
                setInjuries(response.data.map((injury:any) => injury.regiaoLesao));
                setInjuriesDescription(response.data.map((injury:any) => `${injury.data}: ${injury.descricao}`));
            } else {
                setError("Erro ao carregar lesões!")
            }
        } catch (error) {
            setError("Erro ao carregar lesões!")
        } finally {
            setIsLoading(false)
        }
    }
    
    const call = async (ids: number[]) => {
        setIsLoading(true)
        try {
            const response = await post('atleta/chamada', JSON.stringify(ids));
            if (response?.status == 204) {
                router.push('/menu');
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
        <AthleteContext.Provider value={{isLoading, listAthletes, injuries, injuriesDescription, athlete, athleteProfile, medals, success, error, call, getInjuries, getProfile, getAthlete, registerAthlete, updateAthlete}}>
            {children}
        </AthleteContext.Provider>
    )
}

export const useAthleteProvider = () => useContext(AthleteContext)
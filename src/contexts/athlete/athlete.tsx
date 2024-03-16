import { createContext, useContext, useEffect, useState } from "react";
import { useApiProvider } from "../api/api";
import { AthleteProps } from "./athlete.type";


type AthleteState = {
    athlete: AthleteProps | null;
}

const initialState = {
    athlete: null,
}

const AthleteContext = createContext<AthleteState>(initialState);

export const AthleteProvider = ({ children }: {children: React.ReactNode}) => {
    const { get } = useApiProvider();
    const [athlete, setAthlete] = useState<AthleteProps | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get('atletas');
                setAthlete(response?.data);
            } catch (error) {
                console.error("Error fetching athlete data:", error);
            }
        };

        fetchData();
    }, [get]);
    
    
    useEffect(() => {
        const listAthletes = get('atletas');
        console.log(listAthletes)
    }, [])
    
    
    
    return (
        <AthleteContext.Provider value={{athlete}}>
            {children}
        </AthleteContext.Provider>
    )
}

export const useAthleteProvider = () => useContext(AthleteContext)
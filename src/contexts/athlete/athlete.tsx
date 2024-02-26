import { createContext, useContext, useEffect } from "react";
import { useApiProvider } from "../api/api";
import { AthleteProps } from "./athlete.type";

const AthleteContext = createContext({});

export const AthleteProvider = ({ children }: {children: React.ReactNode}) => {
    const [athlete, setAthlete] = useEffect<AthleteProps | null>(null);
    const { get } = useApiProvider();

    const listAthletes = get('atletas');

    
    
    return (
        <AthleteContext.Provider value={{ athlete }}>
            {children}
        </AthleteContext.Provider>
    )
}

export const useAthleteProvider = () => useContext(AthleteContext)
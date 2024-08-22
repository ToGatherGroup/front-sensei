import { useApiProvider } from "../api/api";
import { createContext, useState, useContext, useEffect } from "react";
import { AthleteProfileProps } from "../athlete/athlete.type";

type ComparisonState = {
  athlete: AthleteProfileProps | null;
  rightAthlete: AthleteProfileProps | null;
  leftAthlete: AthleteProfileProps | null;
  getAthleteComparison: (id: number | string, isLeft: boolean) => void;
  selectedAthleteId: string | number | null;
  setSelectedAthleteId: (id: number | string) => void;
  isLeft: boolean;
  setIsLeft: (isLeft: boolean) => void;
  showModal: boolean;
  toggleComparisonModalVisibility: (showModal: boolean) => void;
};



const initialState: ComparisonState = {
  athlete: null,
  rightAthlete: null,
  leftAthlete: null,
  selectedAthleteId: null,
  isLeft: false,
  getAthleteComparison: () => {},
  setSelectedAthleteId: () => {},
  setIsLeft: () => {},
  showModal: false,
  toggleComparisonModalVisibility: () => {},
};

export const ComparisonState = createContext<ComparisonState>(initialState);

export const ComparisonStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { get } = useApiProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [leftAthlete, setLeftAthlete] = useState<AthleteProfileProps | null>(null);
  const [rightAthlete, setRightAthlete] = useState<AthleteProfileProps | null>(null);
  const [athlete, setAthlete] = useState<AthleteProfileProps | null>(null);
  const [selectedAthleteId, setSelectedAthleteId] = useState<number | string | null>(null);
  const [isLeft, setIsLeft] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("useEffect do contexto acionado:")
    if (selectedAthleteId) { // && selectedAthleteId != rightAthlete?.id && selectedAthleteId != leftAthlete?.id) {
      try {
        getAthleteComparison(selectedAthleteId);
      }
      catch (error) {
        console.error("Erro ao obter informações de comparação do atleta", error);
      }
    }
  }, [selectedAthleteId]);

  const toggleComparisonModalVisibility = (showModal: boolean) => {
    console.log("toggleComparisonModalVisibility:", showModal)
    setShowModal(showModal);
  }

  const getAthleteComparison = async (id: number | string) => {
    setIsLeft(true);
    setIsLoading(true);
    try {
      const response = await get(`atleta/comparativo/${id}`);

      setAthlete(response?.data);
      console.log("response", response?.data)
      console.log("isLeft", isLeft)

      if (isLeft) {
        console.log("setLeftAthlete acionado")
        setLeftAthlete(response?.data);
      } else {
        console.log("setRightAthlete acionado")
        setRightAthlete(response?.data);
      }
    } catch (error) {
      console.error("Erro ao obter e tratar dados de comparação do atleta", error);
    } finally {
      setAthlete(null);
      setIsLeft(false);
      setIsLoading(false);
    }
  };

  return (
    <ComparisonState.Provider
      value={{
        athlete,
        leftAthlete,
        rightAthlete,
        setSelectedAthleteId,
        getAthleteComparison,
        selectedAthleteId,
        isLeft,
        setIsLeft,
        showModal,
        toggleComparisonModalVisibility,
      }}
    >
      {children}
    </ComparisonState.Provider>
  );
};

export const useComparisonProvider = () => useContext(ComparisonState);

import { createContext, useContext, useState, useEffect } from "react";
import { useApiProvider } from "../api/api";
import { Grupo } from "@/types/Grupo";


type GroupState = {
    groupList: Grupo[] | []; // Array vazio como fallback
    getGroups: () => Promise<void>;
    postGroup: (name: string) => Promise<void>;
    putGroup: (id: number, grupoData: Partial<Grupo>) => Promise<void>;
};

const initialState = {
    groupList: [] as Grupo[], // Inicializando como array vazio
    getGroups: async () => {},
    postGroup: async () => {},
    putGroup: async () => {},
};

const GroupContext = createContext<GroupState>(initialState);

export const GroupProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { get, post, put } = useApiProvider();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [groupList, setGroupList] = useState<Grupo[]>([]); 

    useEffect(() => {
        getGroups();
      }, []);

      const getGroups = async () => {
        setIsLoading(true);
        try {
          const response = await get(`/grupo`);
          // Verificando se a resposta contém um array antes de atualizar o estado
          if (Array.isArray(response?.data)) {
            setGroupList(response.data);
            console.log("Requisição feita para /grupo", response.data);
          } else {
            console.error("Resposta da API não é um array:", response?.data);
            setGroupList([]);  // Define como array vazio em caso de erro
          }
        } catch (error) {
          console.error("Erro ao obter lista de grupos", error);
          setGroupList([]);  // Define como array vazio em caso de erro
        } finally {
          setIsLoading(false);
        }
      };

      const putGroup = async (id: number, grupoData: Partial<Grupo>) => {
        setIsLoading(true);
        try {
          // Combinando o ID com os dados do grupo em um único objeto
          const bodyData = {
            id,
            ...grupoData
          };
          
          const response = await put(`/grupo`, bodyData);
          console.log("Requisição do tipo PUT feita para /grupo", response?.data);
          getGroups();
        } catch (error) {
          console.error("Erro ao atualizar grupo", error);
        } finally {
          setIsLoading(false);
        }
      };

    const postGroup = async (name: string) => {
        setIsLoading(true);
        try {
            const response = await post(`/grupo`, name);
            setGroupList(response?.data);
            console.log("Requisição do tipo POST feita para /grupo", {name})
            //getGroups();
        } catch (error) {
            console.error("Erro ao obter lista de grupos", error);
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <GroupContext.Provider
            value={{
                groupList,
                getGroups,
                postGroup,
                putGroup,
            }}
        >
            {children}
        </GroupContext.Provider>
    );
};

export const useGroupProvider = () => useContext(GroupContext);

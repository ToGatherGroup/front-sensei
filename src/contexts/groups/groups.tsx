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
    groupList: [] as Grupo[],
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
          const response = await get(`/grupos`);
          if (Array.isArray(response?.data)) {
            setGroupList(response.data);
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
          const bodyData = {
            id,
            ...grupoData
          };
          
          const response = await put(`/grupos`, bodyData);
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
            const response = await post(`/grupos`, name);
            setGroupList(response?.data);
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

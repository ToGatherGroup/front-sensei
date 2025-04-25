import {axios} from "@/api/api";

export const getAtletas = (page: number, elementsQty: number | null) => {
    if (elementsQty) return axios.get(`/atletas?page=${page}&size=${elementsQty}`);
    return axios.get(`/atletas?page=${page}`)
}

export const getAtletaByName = (name:string, page: number, elementsQty: number | null) => {
    if (elementsQty) return axios.get(`/atletas/nome/${name}?page=${page}&size=${elementsQty}`);
    return axios.get(`/atleta/nome/${name}?page=${page}`);
}

export const getAvaliacaoPosturalDatas = (atletaId: number) => {
    return axios.get(`/avaliacoes/postural/datas/${atletaId}`);
}

export const getAvaliacoesPosturais = (atletaId: number, data: string) => {
    return axios.get(`/avaliacoes/posturais/${atletaId}/data/${data}`);
}

export const getCampeonatosByAtleta = (atletaId: number) => {
    return axios.get(`/campeonatos/${atletaId}/lista`);
};
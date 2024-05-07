import {axios} from "@/api/api";

export const getAtletas = (page: number, elementsQty: number | null) => {
    if (elementsQty) return axios.get(`/atleta?page=${page}&size=${elementsQty}`);
    return axios.get(`/atleta?page=${page}`)
}

export const getAtletasByName = (name:string, page: number, elementsQty: number | null) => {
    if (elementsQty) return axios.get(`/atleta/nome/${name}?page=${page}&size=${elementsQty}`);
    return axios.get(`/atleta/nome/${name}?page=${page}`);
}

export const getAvaliacaoPosturalDatas = (atletaId: number) => {
    console.log(`Requisição feita para /avaliacaopostural/datas/${atletaId}`)
    return axios.get(`/avaliacaopostural/datas/${atletaId}`);
}

export const getAvaliacaoPostural = (atletaId: number, data: string) => {
    console.log(`Requisição feita para /avaliacaopostural/${atletaId}/${data}`)
    return axios.get(`/avaliacaopostural/${atletaId}/${data}`);
}


//teste temporario
export const getAtletaById = (id: number) => {
    return axios.get(`/atleta/${id}`);
}
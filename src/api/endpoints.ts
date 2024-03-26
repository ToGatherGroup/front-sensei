import {axios} from "@/api/api";

export const getAtletas = (page: number, elementsQty: number) => {
    console.log("Requisição: ", `/atleta?page=${page}&size=${elementsQty}`)
    return axios.get(`/atleta?page=${page}&size=${elementsQty}`)
}

export const getAtletasByName = (name:string, page: number, elementsQty: number) => {
    console.log("Requisição: ", `/atleta/nome/${name}?page=${page}&size=${elementsQty}`)
    return axios.get(`/atleta/nome/${name}?page=${page}&size=${elementsQty}`)
}
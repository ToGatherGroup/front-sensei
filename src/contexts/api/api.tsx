import { createContext, useContext } from "react";
import { AxiosResponse } from "../../../node_modules/axios/index";

type ApiState = {
    get: (endpoint: string) => Promise<AxiosResponse> | null;
    post: (endpoint: string, body: object | string) => Promise<AxiosResponse> | null;
    put: (endpoint: string, body: object | string) => Promise<AxiosResponse> | null;
    remove: (endpoint: string, body: object | string) => Promise<AxiosResponse> | null;
}

const initialState = {
    get: () => null,
    post: () => null,
    put: () => null,
    remove: () => null,
}

const ApiContext = createContext<ApiState>(initialState);

export const ApiProvider = ({ children }: {children: React.ReactNode}) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
   
    const axios = require('axios');

    const apiInstance = axios.create({
        baseURL: BASE_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });  

    const get = (endpoint: string) => {
        return apiInstance.get(endpoint);
    }

    const post = (endpoint: string, body: object | string) => {
        return apiInstance.post(endpoint, body);
    }

    const put = (endpoint: string, body: object | string) => {
        console.log("Requisição PATCH para o endpoint completo:")
        console.log(`${BASE_URL}${endpoint}`)

        return apiInstance.put(endpoint, body);
    }

    const remove = (endpoint: string, body: object | string) => {
        return apiInstance.delete(endpoint, body);
    }

    return (
        <ApiContext.Provider value={{ get, post, put, remove }}>
            {children}
        </ApiContext.Provider>
    )
}

export const useApiProvider = () => useContext(ApiContext)
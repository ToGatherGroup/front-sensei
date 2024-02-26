'use client'
import { createContext, useContext } from "react";

const ApiContext = createContext({});

export const ApiProvider = ({ children }: {children: React.ReactNode}) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
   
    const axios = require('axios');

    const apiInstance = axios.create({
        baseURL: BASE_URL,
        timeout: 3000,
    });  

    const get = (endpoint: string) => {
        return apiInstance.get(endpoint);
    }

    const post = (endpoint: string, data: object) => {
        return apiInstance.post(endpoint, data);
    }

    const delet = (endpoint: string, data: object) => {
        return apiInstance.delete(endpoint, data);
    }

    return (
        <ApiContext.Provider value={{ get, post, delet }}>
            {children}
        </ApiContext.Provider>
    )
}

export const useApiProvider = () => useContext(ApiContext)
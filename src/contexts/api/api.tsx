import { createContext, useContext, useState } from "react";
import axios, { AxiosResponse } from "../../../node_modules/axios/index";
import toast from "react-hot-toast";
import Loading from "@/components/loading/index";

// URL FOR ALL REQUESTS:
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type ApiState = {
  get: (endpoint: string) => Promise<AxiosResponse> | null;
  post: (
    endpoint: string,
    body: object | string
  ) => Promise<AxiosResponse> | null;
  patch: (
    endpoint: string,
    body: object | string
  ) => Promise<AxiosResponse> | null;
  remove: (
    endpoint: string,
    body: object | string
  ) => Promise<AxiosResponse> | null;
  isLoadingAPI: boolean | undefined;
};

const initialState = {
  get: () => null,
  post: () => null,
  patch: () => null,
  remove: () => null,
  isLoadingAPI: undefined,
};

const ApiContext = createContext<ApiState>(initialState);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  /* const axios = require("axios"); */ //Removido pois desta forma não trás a tipagem do axios
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);

  const apiInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const get = (endpoint: string) => {
    setIsLoadingAPI(true);
    const request = apiInstance.get(endpoint);
    request.catch(({ request: error }) => {
      console.log("error:", error);

      if (error.response) {
        toast.error(
          `Não foi possível carregar as informações do servidor\n${
            error.status && `Cód: ${error.status}`
          }`
        );
      } else {
        toast.error(
          "Não foi possível se conectar ao servidor\nTente novamente em alguns instantes."
        );
      }
      return error;
    });
    request.finally(() => setIsLoadingAPI(false));
    return request;
  };

  /* const post = (endpoint: string, body: object | string) => {
    return apiInstance.post(endpoint, body);
  }; */

  const post = (endpoint: string, body: object | string) => {
    setIsLoadingAPI(true);
    const request = apiInstance.post(endpoint, body);
    request.catch(({ request: error }) => {
      console.log("error:", error);

      if (error.response) {
        toast.error(
          `Não foi possível enviar as informações para o servidor\n${
            error.status && `Cód: ${error.status}`
          }`
        );
      } else {
        toast.error(
          "Não foi possível se conectar ao servidor\nTente novamente em alguns instantes."
        );
      }
      return error;
    });
    request.finally(() => setIsLoadingAPI(false));
    return request;
  };

  const patch = (endpoint: string, body: object | string) => {
    setIsLoadingAPI(true);
    console.log("Requisição PATCH para o endpoint completo:");
    console.log(`${BASE_URL}${endpoint}`);

    const request = apiInstance.patch(endpoint, body);
    request.catch(({ request: error }) => {
      console.log("error:", error);

      if (error.response) {
        toast.error(
          `Não foi possível enviar as informações para o servidor\n${
            error.status && `Cód: ${error.status}`
          }`
        );
      } else {
        toast.error(
          "Não foi possível se conectar ao servidor\nTente novamente em alguns instantes."
        );
      }
      return error;
    });
    request.finally(() => setIsLoadingAPI(false));
    return request;
  };

  const remove = (endpoint: string) => {
    setIsLoadingAPI(true);
    const request = apiInstance.delete(endpoint);
    request.catch(({ request: error }) => {
      console.log("error:", error);

      if (error.response) {
        toast.error(
          `Não foi possível enviar as informações para o servidor\n${
            error.status && `Cód: ${error.status}`
          }`
        );
      } else {
        toast.error(
          "Não foi possível se conectar ao servidor\nTente novamente em alguns instantes."
        );
      }
      return error;
    });
    request.finally(() => setIsLoadingAPI(false));
    return request;
  };

  return (
    <ApiContext.Provider value={{ get, post, patch, remove, isLoadingAPI }}>
      {isLoadingAPI && <Loading />}
      {children}
    </ApiContext.Provider>
  );
};

export const useApiProvider = () => useContext(ApiContext);

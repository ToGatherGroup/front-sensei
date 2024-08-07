import { createContext, useContext, useState } from "react";
import axios, { AxiosResponse } from "../../../node_modules/axios/index";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";

// URL FOR ALL REQUESTS:
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type ApiState = {
  get: (
    endpoint: string,
    displayOptions?: DisplayOptions | undefined
  ) => Promise<AxiosResponse> | null;
  post: (
    endpoint: string,
    body: object | string,
    displayOptions?: DisplayOptions | undefined
  ) => Promise<AxiosResponse> | null;
  put: (
    endpoint: string,
    body: object | string,
    displayOptions?: DisplayOptions | undefined
  ) => Promise<AxiosResponse> | null;
  patch: (
    endpoint: string,
    body: object | string,
    displayOptions?: DisplayOptions | undefined
  ) => Promise<AxiosResponse> | null;
  remove: (
    endpoint: string,
    displayOptions?: DisplayOptions | undefined
  ) => Promise<AxiosResponse> | null;
  isLoadingAPI: boolean | undefined;
};

type DisplayOptions = {
  showLoading?: boolean | undefined;
  toastSuccess?: boolean | undefined;
  toastSuccessMessage?: string | undefined;
};

const initialState = {
  get: () => null,
  post: () => null,
  put: () => null,
  patch: () => null,
  remove: () => null,
  isLoadingAPI: undefined,
};

const ApiContext = createContext<ApiState>(initialState);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);

  const apiInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  function monitorRequest(
    request: Promise<any>,
    displayOptions?: DisplayOptions
  ) {
    // Monitora o sucesso
    displayOptions?.toastSuccess &&
      request.then((data: any) => {
        toast.success(
          displayOptions.toastSuccessMessage ??
            `Informações carregadas com sucesso!`
        );
        return data;
      });

    // Monitora o erro
    request.catch(({ request: error }) => {
      switch (error.status) {
        case 0:
          toast.error(
            `Houve um problema ao se conectar com o servidor.\nTente novamente em alguns instantes.${
              String(error.status) ? "\nHTTP " + error.status : ""
            }`
          );
          break;

        case 502:
          toast.error(
            `Ocorreu um problema com o servidor.${
              String(error.status) ? "\nHTTP " + error.status : ""
            }`
          );
          break;
      }
      return error;
    });
  }

  const get = (
    endpoint: string,
    displayOptions?: DisplayOptions | undefined
  ) => {
    (displayOptions?.showLoading == undefined ||
      displayOptions?.showLoading == true) &&
      setIsLoadingAPI(true);

    const request = apiInstance.get(endpoint);
    monitorRequest(request, displayOptions);

    (displayOptions?.showLoading == undefined ||
      displayOptions?.showLoading == true) &&
      request.finally(() => setIsLoadingAPI(false));
    return request;
  };

  const post = (
    endpoint: string,
    body: object | string,
    displayOptions?: DisplayOptions | undefined
  ) => {
    (displayOptions?.showLoading == undefined ||
      displayOptions?.showLoading == true) &&
      setIsLoadingAPI(true);
    const request = apiInstance.post(endpoint, body);
    monitorRequest(request, displayOptions);

    (displayOptions?.showLoading == undefined ||
      displayOptions?.showLoading == true) &&
      request.finally(() => setIsLoadingAPI(false));
    return request;
  };

  const put = (
    endpoint: string,
    body: object | string,
    displayOptions?: DisplayOptions | undefined
  ) => {
    (displayOptions?.showLoading == undefined ||
      displayOptions?.showLoading == true) &&
      setIsLoadingAPI(true);

    const request = apiInstance.put(endpoint, body);
    monitorRequest(request, displayOptions);

    (displayOptions?.showLoading == undefined ||
      displayOptions?.showLoading == true) &&
      request.finally(() => setIsLoadingAPI(false));
    return request;
  };

  const patch = (
    endpoint: string,
    body: object | string,
    displayOptions?: DisplayOptions | undefined
  ) => {
    (displayOptions?.showLoading == undefined ||
      displayOptions?.showLoading == true) &&
      setIsLoadingAPI(true);

    const request = apiInstance.patch(endpoint, body);
    monitorRequest(request, displayOptions);

    (displayOptions?.showLoading == undefined ||
      displayOptions?.showLoading == true) &&
      request.finally(() => setIsLoadingAPI(false));
    return request;
  };

  const remove = (
    endpoint: string,
    displayOptions?: DisplayOptions | undefined
  ) => {
    (displayOptions?.showLoading == undefined ||
      displayOptions?.showLoading == true) &&
      setIsLoadingAPI(true);
    const request = apiInstance.delete(endpoint);
    monitorRequest(request, displayOptions);

    (displayOptions?.showLoading == undefined ||
      displayOptions?.showLoading == true) &&
      request.finally(() => setIsLoadingAPI(false));
    return request;
  };

  return (
    <ApiContext.Provider
      value={{ get, post, put, patch, remove, isLoadingAPI }}
    >
      {isLoadingAPI && <Loader type="full-screen" />}
      {children}
    </ApiContext.Provider>
  );
};

export const useApiProvider = () => useContext(ApiContext);

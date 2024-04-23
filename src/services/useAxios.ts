import { useCallback, useRef } from "react";

import axios, { AxiosRequestConfig } from "axios";

import config from "../config";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: config.apiTimeout,
});

interface RequestConfig {
  authorized?: boolean;
  errorMessage?: string;
}

interface Dict<T> {
  [id: string]: T;
}

interface AxiosProps {
  makeRequest: (
    config: AxiosRequestConfig & RequestConfig
  ) => Promise<Common.CommonResponse>;
}

const errorMessages: Dict<string> = {
  401: "Sua sessão expirou",
  403: "Acesso negado",
  404: "Recurso não encontrado",
  500: "Ocorreu um erro interno no servidor",
  ECONNABORTED: "A requisição demorou demais a responder",
  ERR_CANCELED: " ",
};

/**
 * Hook para realizar requisições usando o Axios
 */
const useAxios = (): AxiosProps => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const requests = useRef<Dict<AbortController>>({});

  const loginError = useCallback(() => {
    logout(() => {
      navigate("/login", {
        replace: true,
        state: { from: location },
      });
    });

    return {
      success: false,
      error: "Sua sessão expirou",
    } as Common.CommonResponse;
  }, [location, logout, navigate]);

  const makeRequest = useCallback(
    async (
      config: AxiosRequestConfig & RequestConfig
    ): Promise<Common.CommonResponse> => {
      const id = `${config.method}:${config.url || "/"}`;
      console.log("requesting", id);
      try {
        // procura o id na lista de requests em andamento
        const loadingRequest = requests.current[id];
        if (loadingRequest) {
          // se achou, aborta o request e remove da lista
          requests.current[id].abort();
          delete requests.current[id];
        }

        // insere o novo request na lista
        const controller = new AbortController();
        requests.current[id] = controller;

        // adiciona token se necessário
        if (config.authorized && user?.token?.token) {
          config.headers = {
            ...config.headers,
            ["Authorization"]: "Bearer " + user?.token?.token,
          };
        }

        const response = await api<Common.CommonResponse>({
          ...config,
          signal: controller.signal,
        });

        const data = response.data;
        if (!data.success) data.error = data.error || config.errorMessage;
        return data;
      } catch (error) {
        let code: number | string = 0;
        let message =
          config.errorMessage || "Ocorreu um erro ao realizar a requisição";

        if (axios.isAxiosError(error)) {
          const res = error.response;
          code = res?.status || error.code || "";
          message = res?.data?.error || errorMessages[code] || message;
        }

        if (code === 401) {
          return loginError();
        }

        return {
          success: false,
          error: message,
        } as Common.CommonResponse;
      } finally {
        delete requests.current[id];
      }
    },
    [loginError, user?.token?.token]
  );

  return {
    makeRequest: makeRequest,
  };
};

export default useAxios;

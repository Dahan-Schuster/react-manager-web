import { createContext, useCallback, useContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { ApiError } from "../exceptions/ApiError";

import config from "../config";
const { apiBaseUrl, storageKeys } = config;

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext<Auth.AuthContextValues | null>(null);
export default AuthContext;

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  /** Estados da requisição de login */
  const [loading, setLoading] = useState<boolean>(false);

  /** Estados preenchidos após login */
  const [user, setUser] = useLocalStorage<Auth.UserType | null>(
    storageKeys.user,
    null
  );

  /** Envia a requisição de login */
  const login = useCallback(
    async (authConfig: Auth.LoginConfig) => {
      if (loading) return;
      setLoading(true);

      try {
        const { email, password, callback } = authConfig;
        const response: Auth.LoginResponse = await fetch(
          `${apiBaseUrl}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        ).then((res) => res.json());

        if (!response.success) {
          throw new ApiError(response.error!);
        }

        setLoading(false);
        setUser({ ...response.user!, token: response.token! });
        // chama o callback de sucesso
        callback();
      } catch (error) {
        setLoading(false);
        return error instanceof ApiError && error.message
          ? error.message
          : "Não foi possível efetuar o login. Por favor, tente novamente.";
      }
    },
    [loading, setUser]
  );

  /** Desloga o usuário */
  const logout = useCallback(
    async (callback: VoidFunction) => {
      await fetch(`${apiBaseUrl}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token.token}`,
        },
      }).finally(() => {
        setUser(null);
        callback();
      });
    },
    [setUser]
  );

  const sendResetPasswordEmail = useCallback(
    async (email: string) => {
      try {
        if (loading) return;
        setLoading(true);

        const response: Common.CommonResponse = await fetch(
          `${apiBaseUrl}/senha/enviar-email-recuperacao`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        ).then((res) => res.json());

        if (!response.success) {
          throw new ApiError(response.error || "Erro ao enviar e-mail");
        }

        setLoading(false);
        return "";
      } catch (error) {
        setLoading(false);
        return error instanceof ApiError
          ? error.message
          : "Não foi possível enviar o e-mail de recuperação. Por favor, tente novamente.";
      }
    },
    [loading]
  );

  const resetPassword = useCallback(
    async (
      email: string,
      password: string,
      passwordConfirmation: string,
      token: string
    ) => {
      try {
        if (loading) return;
        setLoading(true);

        const response: Common.CommonResponse = await fetch(
          `${apiBaseUrl}/senha/recuperar`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              new_password: password,
              new_password_confirmation: passwordConfirmation,
              token,
            }),
          }
        ).then((res) => res.json());

        if (!response.success) {
          throw new ApiError(response.error || "");
        }

        setLoading(false);
        return "";
      } catch (error) {
        setLoading(false);
        return error instanceof ApiError && error.message
          ? error.message
          : "Não foi possível alterar a senha. Por favor, tente novamente.";
      }
    },
    [loading]
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user?.token?.token,
        user,
        loading,
        login,
        logout,
        sendResetPasswordEmail,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext<Auth.AuthContextValues | null>(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

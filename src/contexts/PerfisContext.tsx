import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import useAxios from "../services/useAxios";

interface PerfisContextValue {
  perfis: Perfis.PerfilType[];
  showPerfil: (
    id: number
  ) => Promise<Common.CommonResponse & { perfil: Perfis.PerfilType }>;
  deletarPerfil: (id: number) => Promise<Common.CommonResponse>;
  getPerfis: (comPermissoes?: boolean) => Promise<void>;
  updatePerfis: (
    id: number,
    values: Perfis.UpdatePerfilValues
  ) => Promise<Common.CommonResponse & { perfil: Perfis.PerfilType }>;
  criarPerfil: (
    values: Perfis.CreatePerfilValues
  ) => Promise<Common.CommonResponse & { perfil: Perfis.PerfilType }>;
}

const PerfisContext = createContext<PerfisContextValue | null>(null);
export default PerfisContext;

/**
 * Contexto dos Perfis do sistema
 * Expõe métodos para CRUD de perfis
 */
export const PerfisProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [perfis, setPerfis] = useState<Perfis.PerfilType[]>([]);
  const { makeRequest } = useAxios();

  const getPerfis = useCallback(
    async (comPermissoes = false) => {
      const response = await makeRequest({
        url: "/perfis" + (comPermissoes ? "/permissoes" : ""),
      });

      if (response.success) {
        setPerfis(response.perfis as Perfis.PerfilType[]);
      }
    },
    [makeRequest]
  );

  const showPerfil = useCallback(
    async (id: number) => {
      const response = await makeRequest({
        url: "/perfis/" + id,
      });

      return response as Common.CommonResponse & { perfil: Perfis.PerfilType };
    },
    [makeRequest]
  );

  const deletarPerfil = useCallback(
    async (id: number) => {
      const response = await makeRequest({
        url: "/perfis/" + id,
        method: "delete",
      });

      if (response.success) {
        setPerfis((list) => list.filter((i) => i.id !== id));
      }

      return response as Common.CommonResponse;
    },
    [makeRequest]
  );

  const updatePerfis = useCallback(
    async (id: number, values: Perfis.UpdatePerfilValues) => {
      const response = await makeRequest({
        method: "put",
        url: "/perfis/" + id,
        data: values,
      });

      if (response.success) {
        setPerfis((perfis) =>
          perfis.map((p) =>
            p.id === id
              ? { ...p, ...(response.perfil as Perfis.PerfilType) }
              : p
          )
        );
      }

      return response as Common.CommonResponse & { perfil: Perfis.PerfilType };
    },
    [makeRequest]
  );

  const criarPerfil = useCallback(
    async (values: Perfis.CreatePerfilValues) => {
      const response = await makeRequest({
        method: "post",
        url: "/perfis/",
        data: values,
      });

      if (response.success) {
        setPerfis((perfis) => [
          ...perfis,
          response.perfil as Perfis.PerfilType,
        ]);
      }

      return response as Common.CommonResponse & { perfil: Perfis.PerfilType };
    },
    [makeRequest]
  );

  return (
    <PerfisContext.Provider
      value={{
        perfis,
        getPerfis,
        showPerfil,
        updatePerfis,
        criarPerfil,
        deletarPerfil,
      }}
    >
      {children}
    </PerfisContext.Provider>
  );
};

export const usePerfis = () => {
  const context = useContext(PerfisContext);

  if (!context) {
    throw new Error("usePerfis must be used within an PerfisProvider");
  }

  return context;
};

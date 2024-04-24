import { useCallback, useState } from "react";
import useAxios from "./useAxios";

interface ModulosProps {
  modulos: Sistema.ModuloType[];
  getModulos: () => void;
}

/**
 * Retorna os módulos do sistema com suas permissões
 * Usado para montar a tabela de permissões por módulo e perfil/usuário
 */
const useModulos = (): ModulosProps => {
  const [modulos, setModulos] = useState<Sistema.ModuloType[]>([]);
  const { makeRequest } = useAxios();

  const getModulos = useCallback(async () => {
    const response = await makeRequest({
      url: "/modulo",
    });

    if (response.success) {
      setModulos(response.modulos as Sistema.ModuloType[]);
    }
  }, []);

  return {
    modulos,
    getModulos,
  };
};

export default useModulos;

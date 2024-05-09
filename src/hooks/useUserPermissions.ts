import { useCallback, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";

interface UserPermissionsProps {
  /**
   * Recebe uma string de permissão e retorna `true` se a mesma estiver presente
   * no array de permissões do usuário logado
   */
  has: (permission: string) => boolean;
  /**
   * Recebe um array de permissões e retorna `true` se ao menos uma estiver presente
   * no array de permissões do usuário logado
   */
  hasOne: (permissions: string[]) => boolean;
  /**
   * Recebe um array de permissões e retorna `true` se todas estiverem presentes
   * no array de permissões do usuário logado
   */
  hasAll: (permissions: string[]) => boolean;
}

/**
 * Hook para validar se o usuário pode acessar um recurso
 */
const useUserPermissions = (): UserPermissionsProps => {
  const { user } = useAuth();

  const userPermissions = useMemo<string[]>(() => {
    return user?.permissoes.map((permission) => permission.slug) || [];
  }, [user]);

  const has = useCallback(
    (permission: string) => {
      return userPermissions.includes(permission);
    },
    [userPermissions]
  );

  const hasOne = useCallback(
    (permissions: string[]) => {
      return permissions.some((permission) =>
        userPermissions.includes(permission)
      );
    },
    [userPermissions]
  );

  const hasAll = useCallback(
    (permissions: string[]) => {
      return permissions.every((permission) =>
        userPermissions.includes(permission)
      );
    },
    [userPermissions]
  );

  return {
    has,
    hasOne,
    hasAll,
  };
};

export default useUserPermissions;

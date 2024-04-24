import { useCallback, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";

interface UserPermissionsProps {
  has: (permission: string) => boolean;
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

  return {
    has,
  };
};

export default useUserPermissions;

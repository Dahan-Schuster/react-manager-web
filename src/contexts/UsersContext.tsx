import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { defaultTablePageSize } from "../constants";
import useAxios from "../services/useAxios";

const UsersContext = createContext<Users.UsersContextValues | null>(null);
export default UsersContext;

/**
 * Contexto de métodos referentes a usuários
 */
export const UsersProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { makeRequest } = useAxios();

  const [users, setUsers] = useState<Users.UserType[]>([]);
  const [pagination, setPagination] = useState<Common.PaginationType | null>(
    null
  );

  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [usersError, setUsersError] = useState<string>("");

  const createUser = useCallback(
    async (
      data: Users.SaveUserValues
    ): Promise<Common.CommonResponse & { user: Users.UserType }> => {
      setLoadingUsers(true);
      const response = (await makeRequest({
        method: "POST",
        url: "/usuario",
        data,
        errorMessage: "Ocorreu um erro ao cadastrar o usuário",
        successMessage: "Usuário cadastrado com sucesso!",
      })) as Common.CommonResponse & { user: Users.UserType };

      setLoadingUsers(false);
      if (response?.success) {
        setUsers((users) => [...users, response.user as Users.UserType]);
      } else {
        setUsersError(response.error!);
      }

      return response;
    },
    [makeRequest]
  );

  const updateUser = useCallback(
    async (
      id: number,
      data: Users.SaveUserValues
    ): Promise<Common.CommonResponse & { user: Users.UserType }> => {
      setLoadingUsers(true);
      const response = await makeRequest({
        method: "PUT",
        url: "/usuario/" + id,
        data: {
          nome: data.nome,
          email: data.email,
        },
        errorMessage: "Ocorreu um erro ao atualizar o usuário",
        successMessage: "Usuário atualizado com sucesso!",
      });

      setLoadingUsers(false);
      if (response?.success) {
        setUsers((users) =>
          users.map((u) => (u.id !== id ? u : { ...u, ...data }))
        );
      } else {
        setUsersError(response.error!);
      }

      return response as Common.CommonResponse & { user: Users.UserType };
    },
    [makeRequest]
  );

  const changeStatusUser = useCallback(
    async (id: number): Promise<Common.CommonResponse> => {
      setLoadingUsers(true);
      const response = await makeRequest({
        method: "PUT",
        url: "/usuario/" + id + "/trocar-status",
        errorMessage: "Ocorreu um erro ao alterar o status do usuário",
        successMessage: "Usuário atualizado com sucesso!",
      });

      setLoadingUsers(false);
      if (response?.success) {
        setUsers((users) =>
          users.map((u) =>
            u.id !== id ? u : { ...u, status: u.status === 1 ? 0 : 1 }
          )
        );
      } else {
        setUsersError(response.error!);
      }
      return response as Common.CommonResponse;
    },
    [makeRequest]
  );

  const changePerfilUser = useCallback(
    async (
      id: number,
      perfilId: number
    ): Promise<Common.CommonResponse & { user: Users.UserType }> => {
      setLoadingUsers(true);
      const response = await makeRequest({
        method: "PUT",
        url: "/usuario/" + id + "/alterar-perfil",
        data: { perfilId: perfilId || null },
        errorMessage: "Ocorreu um erro ao alterar o perfil do usuário",
        successMessage: "Perfil atualizado com sucesso!",
      });

      setLoadingUsers(false);
      if (response?.success) {
        setUsers((users) =>
          users.map((u) =>
            u.id !== id ? u : { ...u, ...(response.user as Users.UserType) }
          )
        );
      } else {
        setUsersError(response.error!);
      }
      return response as Common.CommonResponse & { user: Users.UserType };
    },
    [makeRequest]
  );

  const deleteUser = useCallback(
    async (id: number) => {
      setLoadingUsers(true);
      const response = await makeRequest({
        method: "DELETE",
        url: "/usuario/" + id,
        errorMessage: "Ocorreu um erro ao excluir o usuário",
        successMessage: "Usuário excluído com sucesso!",
      });

      setLoadingUsers(false);
      if (response?.success) {
        setUsers((users) => users.filter((user) => user.id !== id));
      } else {
        setUsersError(response.error!);
      }

      return response;
    },
    [makeRequest]
  );

  const getUsers = useCallback(
    async (filters?: Users.GetUsersFilters) => {
      setLoadingUsers(true);
      const {
        page = 0,
        pageSize = defaultTablePageSize,
        ...values
      } = filters || {};

      const response = (await makeRequest({
        method: "GET",
        url: "/usuario",
        params: {
          ...(page >= 0 ? { page: page + 1 } : {}),
          ...(pageSize >= 0 ? { per_page: pageSize } : {}),
          ...values,
        },
        errorMessage: "Ocorreu um erro ao buscar os usuários",
      })) as Common.CommonResponse & { users: Users.UsersResponse };

      setLoadingUsers(false);
      if (response?.success) {
        const users = response.users;
        setUsers(users.data);
        setPagination(users.meta);
      } else {
        setUsersError(response.error!);
      }
    },
    [makeRequest]
  );

  const showUser = useCallback(
    async (id: number) => {
      const response = (await makeRequest({
        method: "GET",
        url: "/usuario/" + id,
        errorMessage: "Ocorreu um erro ao buscar o usuário",
      })) as Common.CommonResponse & { user: Users.UserType };
      return response;
    },
    [makeRequest]
  );

  const updatePermissoes = useCallback(
    async (id: number, dados: Users.UpdatePermissoesValues) => {
      const response = (await makeRequest({
        method: "PUT",
        url: `/usuario/${id}/permissoes`,
        data: dados,
        errorMessage: "Ocorreu um erro ao alterar as permissões",
      })) as Common.CommonResponse & { user: Users.UserType };
      return response;
    },
    [makeRequest]
  );

  return (
    <UsersContext.Provider
      value={{
        users,
        getUsers,
        createUser,
        deleteUser,
        updateUser,
        changeStatusUser,
        changePerfilUser,
        setUsers,
        showUser,
        usersPagination: pagination,
        loadingUsers,
        usersError,
        updatePermissoes,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUsers must be used within an UsersProvider");
  }

  return context;
};

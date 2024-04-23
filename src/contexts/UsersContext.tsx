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

  const createUser = useCallback(
    async (data: Users.CreateUserValues): Promise<void> => {
      const response = (await makeRequest({
        method: "POST",
        url: "/usuario",
        data: {
          ...data,
          perfilId: data.perfilId ? data.perfilId : undefined,
        },
        errorMessage: "Ocorreu um erro ao cadastrar o usuário",
        successMessage: "Usuário cadastrado com sucesso!",
      })) as Common.CommonResponse & { user: Users.UserType };

      if (response?.success) {
        setUsers((users) => [...users, response.user as Users.UserType]);
      }
    },
    [makeRequest]
  );

  const updateUser = useCallback(
    async (data: Users.UserType): Promise<Users.UserType> => {
      const response = await makeRequest({
        method: "PUT",
        url: "/usuario/" + data.id,
        data,
        errorMessage: "Ocorreu um erro ao atualizar o usuário",
        successMessage: "Usuário atualizado com sucesso!",
      });

      if (response?.success) {
        setUsers((users) =>
          users.map((u) => (u.id !== data.id ? u : { ...u, ...data }))
        );
      }
      return data;
    },
    [makeRequest]
  );

  const deleteUser = useCallback(
    async (id: number) => {
      const response = await makeRequest({
        method: "DELETE",
        url: "/usuario/" + id,
        errorMessage: "Ocorreu um erro ao excluir o usuário",
        successMessage: "Usuário excluído com sucesso!",
      });

      if (response?.success) {
        setUsers((users) => users.filter((user) => user.id !== id));
      }
    },
    [makeRequest]
  );

  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [usersError, setUsersError] = useState<string>("");

  const getUsers = useCallback(
    async (filters?: Users.GetUsersFilters) => {
      setLoadingUsers(true);
      setUsersError("");
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

  return (
    <UsersContext.Provider
      value={{
        users,
        getUsers,
        createUser,
        deleteUser,
        updateUser,
        setUsers,
        usersPagination: pagination,
        loadingUsers,
        usersError,
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

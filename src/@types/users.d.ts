namespace Users {
  interface UserType {
    id: number;
    nome: string;
    email: string;
    status: number;
    perfil_id: number | null;
    perfil?: Perfis.PerfilType;
  }

  type GetUsersFilters = {
    page?: number;
    pageSize?: number;
    perfilId?: number;
    nome?: string;
    email?: string;
    status?: number | "";
  };

  interface UsersResponse {
    data: Users.UserType[];
    meta: Common.PaginationType;
  }

  /**
   * Valores necessários na criação de um usuário
   */
  type CreateUserValues = {
    nome: string;
    email: string;
    perfilId?: number;
    password?: string;
    password_confirmation?: string;
  };

  interface UsersContextValues {
    setUsers: (
      users: Users.UserType[] | ((users: Users.UserType[]) => Users.UserType[])
    ) => void;
    /**
     * Busca usuários na API, atualizando a lista de usuários em caso de sucesso
     * Caso a requisição não seja bem sucedida, atualiza o estado `usersError`
     */
    getUsers: (filters?: Users.GetUsersFilters) => Promise<void>;
    /** Se está fazendo requisições aos endpoints `/user` ou não */
    loadingUsers: boolean;
    /**
     * Lista de usuários da API
     * Atualizada ao realizar CRUD de usuários
     */
    users: Users.UserType[];
    /**
     * Objeto de paginação de usuários
     */
    usersPagination: Common.PaginationType | null;
    /** Mensagem de erro ocorrido ao buscar usuários */
    usersError: string;
    /**
     * Envia o ID para deleção na API, atualizando a lista de usuários em caso de sucesso
     * @throws {Error} Caso a requisição não seja bem sucedida
     */
    deleteUser: (id: number) => Promise<Common.CommonResponse>;
    /**
     * Envia os dados para a API, atualizando a lista de usuários em caso de sucesso
     * @throws {Error} Caso a requisição não seja bem sucedida
     */
    updateUser: (
      data: Users.UserType
    ) => Promise<Common.CommonResponse & { user: Users.UserType }>;
    createUser: (
      data: Users.CreateUserValues
    ) => Promise<Common.CommonResponse & { user: Users.UserType }>;
    changeStatusUser: (id: number) => Promise<Common.CommonResponse>;
  }
}

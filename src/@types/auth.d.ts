namespace Auth {
  type LoginResponse = {
    success: boolean;
    token?: TokenType;
    user?: UserType;
    error?: string;
  };

  type LoginConfig = {
    email?: string;
    password: string;
    callback: () => Promise<void> | void;
  };

  type TokenType = {
    token: string;
    refreshToken: string;
  };

  type UserType = {
    id: number;
    nome: string;
    email: string;
    token: TokenType;
    permissoes: PermissaoType[];
  };

  type PermissaoType = {
    label: string;
    slug: string;
  };

  interface AuthContextValues {
    isAuthenticated: boolean;
    user: UserType | null;
    loading: boolean;
    login: (config: LoginConfig) => Promise<string | undefined>;
    logout: (callback: VoidFunction) => Promise<string | undefined>;
    logout: (callback: VoidFunction) => void;
    sendResetPasswordEmail: (email: string) => Promise<string | undefined>;
    resetPassword: (
      email: string,
      password: string,
      passwordConfirmation: string,
      token: string
    ) => Promise<string | undefined>;
  }
}

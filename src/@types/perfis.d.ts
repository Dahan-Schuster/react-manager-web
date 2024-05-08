namespace Perfis {
  interface PerfilType {
    id: number;
    nome: string;
    permissoes?: Sistema.PermissaoType[];
  }

  interface UpdatePerfilValues {
    nome?: string;
    novasPermissoes?: number[];
    permissoesDeletar?: number[];
  }

  interface CreatePerfilValues {
    nome: string;
  }
}

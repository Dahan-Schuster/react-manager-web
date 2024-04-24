namespace Perfis {
  interface PerfilType {
    id: number;
    nome: string;
    permissoes?: Sistema.PermissaoType[];
  }
}

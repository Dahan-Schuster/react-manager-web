namespace Sistema {
  interface ModuloType {
    id: number;
    nome: string;
    created_at: string;
    updated_at: string;
    tiposPermissoes: PermissaoType[];
  }

  interface PermissaoType {
    id: number;
    label: string;
    slug: string;
  }
}

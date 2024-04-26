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

  interface MenuItemType {
    id: number;
    label: string;
    url: string | null;
    icone: string | null;
    ativo?: boolean;
    target: Common.AnchorTargetType;
    parent_id: number | null;
    parent?: MenuItemType;
    children?: MenuItemType[];
  }
}

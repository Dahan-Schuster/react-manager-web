namespace Mui {
  interface Theme {
    id: number;
    nome: string;
    ativo: number;
    mui_mode: ThemeMode;
    url_favicon: string;
    url_logo_header: string;
    url_logo_login: string | null;
    url_logo_simples: string | null;
    created_at: string;
    updated_at: string;
    background_default: string | undefined;
    background_paper: string | undefined;
    text_primary: string | undefined;
    text_secondary: string | undefined;
    text_disabled: string | undefined;
    cor_header: string | undefined;
    cor_texto_header: string | undefined;
    cor_menu: string | undefined;
    cor_texto_menu: string | undefined;
    cores_paleta: Record<PaletteOptions, Palette>;
  }

  type ThemeMode = "light" | "dark";

  type PaletteOptions =
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success";

  interface Palette {
    main: string;
    dark: string | undefined;
    light: string | undefined;
    contrastText: string | undefined;
  }
}

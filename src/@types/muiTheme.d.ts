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
    coresMui: Record<PaletteOptions, Palette>;
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
    id: number;
    "100": string | undefined;
    "200": string | undefined;
    "300": string | undefined;
    "400": string | undefined;
    "500": string | undefined;
    "600": string | undefined;
    "700": string | undefined;
    nome: string;
    main: string;
    dark: string | undefined;
    light: string | undefined;
    contrast_text: string | undefined;
    created_at: string;
    updated_at: string;
  }
}

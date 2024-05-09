export const storageBaseName = "projetoPadrao";

export const nomesRotas: {
  [key: string]: { label: string; icon?: string; disableLink?: boolean };
} = {
  "/": { label: "Home", icon: "home" },
  "/usuarios": { label: "Usuários", icon: "people" },
  "/perfis": { label: "Perfis", icon: "account_box" },
  "/temas": { label: "Temas", icon: "palette" },
  "/temas/editar": { label: "Editar", icon: "edit", disableLink: true },
  "/temas/novo": { label: "Novo tema", disableLink: true },
};

export const drawerWidthOpen = 250 as const;
export const drawerWidthClosed = "calc(56px + 1px)" as const;

export const appBarMinHeight = "80px" as const;

export const isIOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

export const defaultTablePageSize = 25;

export const tablePageSizes = [25, 50, 100];

export const acceptImg = "image/png, image/jpg, image/jpeg";

export const MuiDefaultPalette = {
  primary: {
    main: "#3f51b5",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#f50057",
    contrastText: "#ffffff",
  },
  error: {
    main: "#f44336",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#ff9800",
    contrastText: "#000000",
  },
  info: {
    main: "#2196f3",
    contrastText: "#ffffff",
  },
  success: {
    main: "#4caf50",
    contrastText: "#000000",
  },
} as Record<Mui.PaletteOptions, Mui.Palette>;

export const MuiPaletteNames = {
  primary: "Primária",
  secondary: "Secundária",
  error: "Erro",
  warning: "Atenção",
  info: "Info",
  success: "Sucesso",
} as Record<Mui.PaletteOptions, string>;

export const MuiModesNames = {
  light: "Claro",
  dark: "Escuro",
} as Record<Mui.ThemeMode, string>;

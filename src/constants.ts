import type { TextFieldProps } from "@mui/material/TextField";

export const storageBaseName = "projetoPadrao";

export const nomesRotas: {
  [key: string]: { label: string; icon?: string; disableLink?: boolean };
} = {
  "/": { label: "Home", icon: "home" },
  "/usuarios": { label: "Usuários", icon: "people" },
  "/usuarios/novo": { label: "Novo Usuário", disableLink: true },
  "/usuarios/editar": { label: "Editar", disableLink: true },
  "/perfis": { label: "Perfis", icon: "account_box" },
  "/temas": { label: "Temas", icon: "palette" },
  "/temas/editar": { label: "Editar", icon: "edit", disableLink: true },
  "/temas/novo": { label: "Novo tema", disableLink: true },
  "/logs": { label: "Logs", icon: "list" },
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

export const inputsMargin = "normal";

export const FileSizesBytes = {
  mb: 1048576,
  kb: 1024,
};

export const commonTextFieldProps: Partial<TextFieldProps> = {
  margin: inputsMargin,
  fullWidth: true,
  autoComplete: "off",
};

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

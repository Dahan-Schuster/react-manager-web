export const nomesRotas: { [key: string]: { label: string; icon?: string } } = {
  "/": { label: "Home", icon: "home" },
  "/usuarios": { label: "Usuários", icon: "people" },
  "/perfis": { label: "Perfis", icon: "account_box" },
  "/temas": { label: "Temas", icon: "palette" },
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
  },
  secondary: {
    main: "#f50057",
  },
  error: {
    main: "#f44336",
  },
  warning: {
    main: "#ff9800",
  },
  info: {
    main: "#2196f3",
  },
  success: {
    main: "#4caf50",
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

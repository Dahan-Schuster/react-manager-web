export const nomesRotas: { [key: string]: { label: string; icon?: string } } = {
  "/": { label: "Home", icon: "home" },
  "/usuarios": { label: "Usuários", icon: "people" },
  "/perfis": { label: "Perfis", icon: "account_box" },
};

export const drawerWidthOpen = 250 as const;
export const drawerWidthClosed = "calc(56px + 1px)" as const;

export const appBarMinHeight = "80px" as const;

export const isIOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

export const defaultTablePageSize = 25;

export const tablePageSizes = [25, 50, 100];

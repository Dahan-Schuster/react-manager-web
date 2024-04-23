export const drawerWidth = 250 as const;

export const appBarMinHeight = "80px" as const;

export const isIOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

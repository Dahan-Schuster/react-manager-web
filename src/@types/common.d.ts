namespace Common {
  type CommonResponse = {
    success: boolean;
    error?: string;
    data?: unknown;
    [key: string]: unknown;
  };

  type DrawerItemType = {
    path: string;
    label: string;
    Icon: JSX.Element;
    iconColor?: string;
  };
}

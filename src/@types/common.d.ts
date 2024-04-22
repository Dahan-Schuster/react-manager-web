namespace Common {
  type CommonResponse = {
    success: boolean;
    error?: string;
    data?: unknown;
    [key: string]: unknown;
  };
}

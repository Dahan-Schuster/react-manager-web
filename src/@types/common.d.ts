namespace Common {
  type CommonResponse = {
    success: boolean;
    error?: string;
    data?: unknown;
    [key: string]: unknown;
  };

  type AdonisPaginationType = {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    previous_page_url: string | null;
  };

  type PaginationModel = {
    page: number;
    pageSize: number;
  };

  type AnchorTargetType = "_blank" | "_self" | "_parent" | "_top";
}

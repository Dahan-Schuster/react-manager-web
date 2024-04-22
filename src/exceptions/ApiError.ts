export class ApiError extends Error {
  protected code: number;
  protected redirectTo?: string;
  constructor(message: string, code: number = 400, redirectTo?: string) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.redirectTo = redirectTo;
  }

  public getRedirectTo(): string {
    return this.redirectTo || "";
  }
}

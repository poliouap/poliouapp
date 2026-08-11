export class ApiResponse<T> {
  public readonly success: boolean;
  public readonly message?: string;
  public readonly data?: T;

  constructor(data?: T, message?: string) {
    this.success = true;
    if (message !== undefined) this.message = message;
    if (data !== undefined) this.data = data;
  }
}

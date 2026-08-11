export class ApiResponse<T> {
  public readonly success: boolean;
  public readonly message?: string;
  public readonly data?: T;

  constructor(data?: T, message?: string) {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}

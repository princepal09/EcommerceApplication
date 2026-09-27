  class ApiError extends Error {
  public readonly status: number;
  public readonly errors: unknown[];
  public readonly success: boolean;

  constructor(status: number, message = 'Something went wrong', errors: unknown[] = []) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
    this.success = false;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default ApiError;

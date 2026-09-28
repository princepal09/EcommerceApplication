export type ApiResponseType<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export interface IJwtPayload {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiError {
  message: string;
  isError: boolean;
  code?: string;
}

export interface ApiResponse<T> {
  message: string;
  error: ApiError;
  data?: T;
  statusCode: number;
  timestamp: number;
}

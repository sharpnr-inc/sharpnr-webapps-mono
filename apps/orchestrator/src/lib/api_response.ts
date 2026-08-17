export interface APIError {
  status: number;
  message: string;
}

export interface APIResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: APIError;
  timestamp: string;
  token?: string;
}

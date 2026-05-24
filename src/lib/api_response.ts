export interface APIError {
  status: number;
  code: string;
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

export interface ApiResponse<T> {
  data: T;
  status: "success";
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

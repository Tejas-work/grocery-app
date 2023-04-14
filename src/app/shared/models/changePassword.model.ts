export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}


export interface ChangePasswordResponse {
  status: number;
  success: boolean;
  message: string;
  data: number[];
}

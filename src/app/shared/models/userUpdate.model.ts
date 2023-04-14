export interface UserUpdate {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  secondary_mobile_number: string;
  secondary_email: string;
}


export interface UserUpdateResponse {
  status: number;
  success: boolean;
  message: string;
  data: number[];
}

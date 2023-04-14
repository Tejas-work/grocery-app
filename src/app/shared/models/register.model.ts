export interface Register{
  first_name:string,
  last_name:string,
  primary_mobile_number:string,
  primary_email:string,
  username:string,
  password:string
}

export interface RegisterResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    id: number;
    first_name: string;
    last_name: string;
    primary_mobile_number: string;
    primary_email: string;
    username: string;
    password: string;
    updatedAt: string;
    createdAt: string;
  }
}

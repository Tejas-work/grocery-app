export interface LogIn {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    user: {
      first_name: string;
      last_name: string;
      username: string;
    };
    token: string;
  };
}

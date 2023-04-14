export interface CustomerDetailsResponse {
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
    date_of_birth: string | null;
    secondary_mobile_number: string | null;
    secondary_email: string | null;
    customer_type: number;
    is_active: boolean;
    deleted_at: string | null;
    createdAt: string;
    updatedAt: string;
    addresses: {
      id: number;
      customer_id: number;
      address_line_1: string;
      address_line_2: string;
      area: string;
      city: string;
      state: string;
      country: string;
      postal_code: string;
      landmark: string;
      tag: string;
      is_default: boolean;
      deleted_at: string | null;
      createdAt: string;
      updatedAt: string;
    }[];
  }
}

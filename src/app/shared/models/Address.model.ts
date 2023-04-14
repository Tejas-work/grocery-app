export interface AddAddress {
  address_line_1: string;
  address_line_2: string;
  area: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  landmark: string;
  tag: string;
}

export interface AddAddressResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
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
    updatedAt: string;
    createdAt: string;
  }
}

export interface AddressUpdateRequest {
  address_line_1: string;
  address_line_2: string;
  area: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  landmark: string;
  tag: string;
}

export interface AddressUpdateResponse {
  status: number;
  success: boolean;
  message: string;
  data: number[];
}
export interface AddressDeleteResponse {
  status: number;
  success: boolean;
  message: string;
  data: number;
}

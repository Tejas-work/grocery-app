export interface Order {
  order_date: string;
  special_note: string;
  estimate_delivery_date: string;
  sub_total: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  paid_amount: number;
  payment_type: number;
  order_products: OrderProduct[];
}

export interface OrderProduct {
  product_id: number;
  product_name: string;
  qty: number;
  product_amount: number;
  discount_type: number;
  discount_amount: number;
}



export interface ApiOrder {
  id: number;
  order_date: string;
  special_note: string;
  estimate_delivery_date: string;
  sub_total: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  paid_amount: number;
  payment_type: number;
  customer_id: number;
  delivery_address_id: string;
  billing_address_id: string;
  payment_status: string;
  order_status: string;
  updatedAt: string;
  createdAt: string;
}


export interface OrderApiResponse {
  status: number;
  success: boolean;
  message: string;
  data: ApiOrder[];
}



//xcfvgbhnjkml,;
export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  primary_mobile_number: string;
  primary_email: string;
  username: string;
  password: string;
  date_of_birth: string;
  secondary_mobile_number: string;
  secondary_email: string;
  customer_type: number;
  is_active: boolean;
  deleted_at: null;
  createdAt: string;
  updatedAt: string;
  orders: OrderRes[];
}

export interface OrderRes {
  id: number;
  customer_id: number;
  delivery_address_id: number;
  billing_address_id: number;
  payment_status: number;
  order_status: number;
  order_number: null;
  order_date: string;
  special_note: string;
  estimate_delivery_date: string;
  sub_total: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  paid_amount: number;
  payment_type: number;
  deleted_at: null;
  createdAt: string;
  updatedAt: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  qty: number;
  product_amount: number;
  discount_type: number;
  discount_amount: number;
  deleted_at: null;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface Product {
  id: number;
  title: string;
  amount: number;
  discount_type: number;
  discount_amount: number;
  avatar_image: string;
  images: null;
  short_description: string;
  description: string;
  slug: string;
  is_active: boolean;
  deleted_at: null;
  createdAt: string;
  updatedAt: string;
}



export interface getOrders {
  status: number;
  success: boolean;
  message: string;
  data: Customer;
}

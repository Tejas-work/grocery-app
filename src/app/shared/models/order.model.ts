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

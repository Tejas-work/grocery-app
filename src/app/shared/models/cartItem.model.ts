export interface CartItem {
  id:number;
  product_id: number;
  product_name: string;
  qty: number;
  product_amount: number;
  discount_type: number;
  discount_amount: number;
  category: string;
  subtotal: number;
}


export interface UserCartItem{
  id:string,
  cart:CartItem[]
}

export interface CartItem {
  id: number;
  grocery_name: string;
  store: string;
  category: string;
  discountPrice?: number|null;
  price: number;
  quantity: number;
  subtotal: number;
  imageUrl: string;
  quantityCount:number;
}

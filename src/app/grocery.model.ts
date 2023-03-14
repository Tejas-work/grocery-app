export interface Grocery {
  id: number;
  grocery_name: string;
  store: string;
  price: number;
  discountPrice?: number|null;
  rating?: number;
  quantity: string;
  category: string;
  imageUrl:string
}

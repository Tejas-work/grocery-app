export interface Product {
  amount: number;
  avatar_image: string;
  createdAt: string;
  deleted_at: string | null;
  description: string;
  discount_amount: number;
  discount_type: number;
  id: number;
  images: string[] | null;
  is_active: boolean;
  short_description: string;
  slug: string;
  title: string;
  updatedAt: string;
}


export interface Category {
  id: number;
  parent_id: number | null;
  slug: string;
  title: string;
}

export interface CategoryApiResponse {
  status: number;
  success: boolean;
  message: string;
  data: Category[];
}

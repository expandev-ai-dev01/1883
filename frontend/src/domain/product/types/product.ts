export interface Product {
  id: number;
  name: string;
  category: string;
  price: number | null;
  originalPrice: number | null;
  imageUrl: string;
  status: 'available' | 'out_of_stock' | 'on_request';
  isFeatured: boolean;
  isNew: boolean;
  createdAt: string;
}

export interface ProductListParams {
  page?: number;
  pageSize?: number;
  sortBy?: 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'date_desc';
  category?: string | null;
}

export interface ProductListResponse {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

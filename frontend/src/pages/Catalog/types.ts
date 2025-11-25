export interface CatalogFilters {
  page: number;
  pageSize: number;
  sortBy: 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'date_desc';
  category: string | null;
}

export type ViewLayout = 'grid_small' | 'grid_medium' | 'grid_large';

import type { Product } from '@/domain/product/types';
import type { ViewLayout } from '../../types';

export interface CatalogGridProps {
  products: Product[];
  viewLayout: ViewLayout;
  onProductClick: (product: Product) => void;
}
